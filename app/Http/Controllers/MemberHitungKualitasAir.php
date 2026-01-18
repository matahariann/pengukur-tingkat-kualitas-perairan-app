<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberHitungKualitasAir extends Controller
{
    public function index()
    {
        return Inertia::render('Member/Hitung Kualitas Air/page');
    }
}
