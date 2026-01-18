<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberPembayaran extends Controller
{
    public function index()
    {
        return Inertia::render('Member/Pembayaran/page');
    }
}
