<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController
{
    public function index()
    {
        return Inertia::render('Welcome', []);
    }
}
