<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\ProductSearchService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController
{
    public function index(Request $request, ProductSearchService $service): Response
    {
        return Inertia::render('Welcome', [
            'featuredProducts' => $service->featured(),
            'searchResults' => $service->search($request->input('q')),
            'searchQuery' => $request->input('q'),
        ]);
    }
}
