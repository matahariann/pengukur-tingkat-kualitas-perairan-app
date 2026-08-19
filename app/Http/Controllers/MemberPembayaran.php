<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Models\Payment;
use Inertia\Inertia;

class MemberPembayaran extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $perPage = $request->input('per_page', 10);
        $payments = \App\Models\Payment::where('id_user', $user->id)
            ->orderBy('created_at', 'desc')
            ->with(['user:id,email,membership_start_at,membership_end_at'])
            ->paginate($perPage)
            ->withQueryString()
            ->through(function ($payment) {
                $proof = (string) ($payment->proof ?? '');
                $proofUrl = $proof;

                if ($proof && !preg_match('/^https?:\/\//i', $proof)) {
                    if (strpos($proof, '/') === false) {
                        // Seeded file directly in public folder
                        $proofUrl = '/' . ltrim($proof, '/');
                    } else {
                        // Uploaded file under storage/app/public/...
                        $proofUrl = '/storage/' . ltrim($proof, '/');
                    }
                }

                return [
                    'id' => $payment->id,
                    'status' => $payment->status,
                    'proof' => $payment->proof,
                    'proof_url' => $proofUrl,
                    'snap_token' => $payment->snap_token,
                    'order_id' => $payment->order_id,
                    'created_at' => $payment->created_at,
                    'user' => [
                        'membership_start_at' => $payment->user?->membership_start_at,
                        'membership_end_at' => $payment->user?->membership_end_at,
                    ]
                ];
            });

        return Inertia::render("Member/Pembayaran/page", [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'membership' => $user->is_membership,
                    'membership_start_at' => $user->membership_start_at,
                    'membership_end_at' => $user->membership_end_at,
                ]
            ],
            'payments' => $payments,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        // Debug logging: preview config values (do not log full server key)
        Log::info('MemberPembayaran::store called', [
            'user_id' => $user->id,
            'midtrans_server_key_preview' => substr(config('midtrans.server_key') ?? '', 0, 8),
            'midtrans_is_production' => config('midtrans.is_production'),
        ]);

        // Check if there's a pending payment
        $pendingPayment = Payment::where('id_user', $user->id)
            ->where(function($q) {
                $q->where('status', 'pending')
                  ->orWhere('status', 'Pending');
            })
            ->first();

        if ($pendingPayment) {
            // 1. If the local record is older than 24 hours (default Midtrans Snap token lifetime), mark it rejected
            if ($pendingPayment->created_at && $pendingPayment->created_at->diffInHours(now()) >= 24) {
                $pendingPayment->update(['status' => 'rejected']);
                $pendingPayment = null;
            } else {
                // 2. Double check status with Midtrans API to handle expired/cancelled/settled states
                try {
                    \Midtrans\Config::$serverKey = config('midtrans.server_key');
                    \Midtrans\Config::$isProduction = config('midtrans.is_production');
                    
                    $statusResponse = \Midtrans\Transaction::status($pendingPayment->order_id);
                    $transactionStatus = $statusResponse->transaction_status ?? '';

                    if (in_array($transactionStatus, ['deny', 'expire', 'cancel', 'failure'])) {
                        $pendingPayment->update(['status' => 'rejected']);
                        $pendingPayment = null; 
                    } elseif (in_array($transactionStatus, ['settlement', 'capture'])) {
                        $pendingPayment->update(['status' => 'approved']);
                        
                        // Update user membership
                        if ($user && $user->role === 'member') {
                            $user->is_membership = true;
                            $user->membership_start_at = now();
                            $user->membership_end_at = now()->addMonth();
                            $user->save();
                        }
                        return redirect()->back()->with('success', 'Pembayaran Anda telah berhasil dan disetujui.');
                    }
                } catch (\Exception $e) {
                    Log::warning('Midtrans check status failed for order ' . $pendingPayment->order_id . ': ' . $e->getMessage());
                    
                    // If Midtrans API explicitly returns 404 (meaning the transaction was never finalized in Snap UI and expired or is invalid)
                    // and it's already been more than 30 minutes, let's reject it so the user can try again with a fresh token.
                    if (str_contains(strtolower($e->getMessage()), '404') || ($pendingPayment->created_at && $pendingPayment->created_at->diffInMinutes(now()) >= 30)) {
                        $pendingPayment->update(['status' => 'rejected']);
                        $pendingPayment = null;
                    }
                }
            }
        }

        \Midtrans\Config::$serverKey = config('midtrans.server_key');
        \Midtrans\Config::$isProduction = config('midtrans.is_production');
        \Midtrans\Config::$isSanitized = config('midtrans.is_sanitized');
        \Midtrans\Config::$is3ds = config('midtrans.is_3ds');

        $orderId = 'MEMBERSHIP-' . $user->id . '-' . time();
        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => 500000,
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
            ]
        ];

        try {
            $snapToken = \Midtrans\Snap::getSnapToken($params);

            Log::info('Midtrans Snap token generated', ['order_id' => $orderId, 'snap_token_preview' => substr($snapToken, 0, 8)]);

            Payment::create([
                'id_user' => $user->id,
                'status' => 'pending',
                'order_id' => $orderId,
                'snap_token' => $snapToken,
            ]);

            return redirect()->back()->with('snapToken', $snapToken);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghubungkan ke Midtrans: ' . $e->getMessage());
        }
    }

    /**
     * Update bukti pembayaran untuk history yang belum disetujui.
     */
    public function update(Request $request, Payment $payment)
    {
        // Dengan Midtrans, tidak perlu manual update bukti pembayaran.
        // Jika ada status gagal, user buat baru atau bayar ulang.
        return redirect()->back()->with('error', 'Pembayaran menggunakan Midtrans tidak dapat diedit secara manual.');
    }

    /**
     * Hapus history pembayaran yang belum disetujui.
     */
    public function destroy(Payment $payment)
    {
        $user = Auth::user();

        // Pastikan payment milik user & belum disetujui
        if ($payment->id_user !== $user->id || strtolower($payment->status) === 'approved') {
            abort(403, 'Anda tidak dapat membatalkan pembayaran ini.');
        }

        // Jika payment ini di-cancel, kita hapus dari database
        $payment->delete();

        return redirect()->back()->with('success', 'Transaksi berhasil dibatalkan.');
    }
}
