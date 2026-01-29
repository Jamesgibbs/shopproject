<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\DataTransferObjects\ProductData;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class HomeController
{
    public function index(): Response
    {
        $featuredProducts = Product::featured()
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get();


        return Inertia::render('Welcome', [
            'featuredProducts' => $featuredProducts->map(fn (Product $product) => ProductData::fromModel($product)->toArray()),
        ]);
    }
}
