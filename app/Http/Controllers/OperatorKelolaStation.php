<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OperatorKelolaStation extends Controller
{
    public function index()
    {
        return Inertia::render('Operator/Kelola Station/page');
    }
}
