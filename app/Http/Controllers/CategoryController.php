<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function show(string $slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();

        return Inertia::render('Categories/Show', [
            'category' => $category->load(['children', 'products', 'parent']),
        ]);
    }
}
