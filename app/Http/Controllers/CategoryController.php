<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function show(string $slug): Response
    {
        $category = Category::where('slug', $slug)->firstOrFail();

        return Inertia::render('Categories/Show', [
            'category' => $category->load(['children', 'products', 'parent']),
        ]);
    }
}
