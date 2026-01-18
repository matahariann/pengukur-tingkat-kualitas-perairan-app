<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OperatorHitungKualitasAir extends Controller
{
    public function index()
    {
        return Inertia::render('Operator/Hitung Kualitas Air/page');
    }
}
