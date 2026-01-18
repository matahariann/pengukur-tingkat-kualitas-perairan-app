<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminKelolaBobot extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Kelola Bobot/page');
    }
}
