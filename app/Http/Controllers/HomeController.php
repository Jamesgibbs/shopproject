<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class HomeController
{
    public function index()
    {
        $featuredProducts = Product::featured()
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get();

        return Inertia::render('Welcome', [
            'featuredProducts' => $featuredProducts
        ]);
    }
}
