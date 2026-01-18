<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberHistory extends Controller
{
    public function index()
    {
        return Inertia::render('Member/History/page');
    }
}
