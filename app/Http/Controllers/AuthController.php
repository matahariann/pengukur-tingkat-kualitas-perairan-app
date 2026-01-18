<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function register()
    {
        return Inertia::render('Registrasi');
    }

    public function login()
    {
        if (Auth::check()) {
            return redirect('/');
        } else {
            return Inertia::render('Login');
        }
    }

    public function actionLogin(Request $request)
    {
        $data = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ];

        if (Auth::attempt($data)) {
            $request->session()->regenerate();

            // Flash message sukses
            Session::flash('success', 'Login berhasil! Selamat datang.');

            // Redirect sesuai role
            if (Auth::user()->role === 'member') {
                return redirect()->route('member.history');
            } elseif (Auth::user()->role === 'operator') {
                return redirect()->route('operator.history');
            } if (Auth::user()->role === 'admin') {
                return redirect()->route('admin.kelola-pengguna');
            }
        }

        // Jika login gagal, return dengan error
        Session::flash('error', 'Email atau Password Salah');
        return back()->withErrors(['email' => 'Email atau Password Salah'])->withInput();
    }

    public function actionLogout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login')->with('info', 'Anda telah berhasil logout.');
    }
}
