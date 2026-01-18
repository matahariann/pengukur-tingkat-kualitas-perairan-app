<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminHitungKualitasAir extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Hitung Kualitas Air/page');
    }
}
