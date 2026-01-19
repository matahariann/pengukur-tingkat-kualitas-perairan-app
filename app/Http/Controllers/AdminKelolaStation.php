<?php

namespace App\Http\Controllers;

use App\Models\Station;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminKelolaStation extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
    
        // Ambil jumlah data per halaman dari request, default 10
        $perPage = $request->input('per_page', 10);
    
        // Validasi jumlah data per halaman
        $allowedPerPage = [5, 10, 25, 50, 100];
        if (!in_array($perPage, $allowedPerPage)) {
            $perPage = 10;
        }
    
        // Ambil data station dengan pagination
        $stations = Station::with([
            'waterType:id,name',
            'geoZone:id,name',
            'user:id,name,email,role,is_membership',
        ])
        ->orderBy('created_at', 'desc')
        ->paginate($perPage)
        ->withQueryString();
    
        $users = User::orderBy('created_at', 'desc')->paginate($perPage);
        // Kirim data ke view
        return Inertia::render("Admin/Kelola Station/page", [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'membership' => $user->is_membership,
                ]
            ],
            'stations' => $stations,
            'users' => $users
        ]);
    }
}
