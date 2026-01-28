<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'comment' => 'required|string|min:3',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $product->reviews()->create([
            'user_id' => auth()->id(),
            'comment' => $validated['comment'],
            'rating' => $validated['rating'],
        ]);

        return redirect()->back()->with('success', 'Review added!');
    }
}
