<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'comment' => 'required|string|min:3',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        return $product->reviews()->create([
            'user_id' => auth()->id(),
            'comment' => $validated['comment'],
            'rating' => $validated['rating'],
        ]);
    }
}
