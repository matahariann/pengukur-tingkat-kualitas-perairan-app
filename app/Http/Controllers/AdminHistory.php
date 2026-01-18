<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminHistory extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/History/page');
    }
}
