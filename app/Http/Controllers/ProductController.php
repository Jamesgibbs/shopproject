<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index()
    {
        $query = Product::with('supplier')
            ->when(auth()->user()->role === 'supplier', function ($query) {
                $query->where('supplier_id', auth()->id());
            })
            ->orderBy('created_at', 'desc');

        $products = $query->paginate(10);

        $categorires = Category::all();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categorires,
        ]);
    }

    public function view(Product $product)
    {
        $product->load(['reviews' => function($query) {
            $query->with('user:id,name')
            ->latest();
        }]);

        return Inertia::render('Products/Product', [
            'product' => array_merge($product->toArray(), [
                'average_rating' => $product->average_rating,
                'reviews_count' => $product->reviews_count,
            ])
        ]);
    }

    public function create(Request $request)
    {
        try {

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'nullable|',
                'stock_quantity' => 'nullable|',
            ]);

            $validated['supplier_id'] = Auth::id();

            Product::create($validated);
        } catch (\Throwable $th) {
            Log::debug('creating Product failed', [$th]);
        }

        return redirect()->back();
    }

    public function store(Request $request)
    {
       $validated =  $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
       ]);

       $validated['supplier_id'] = Auth::id();

       $product = Product::create($validated);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $product->images()->create([
                'path' => $path,
                'alt' => $validated['name']
            ]);
        }

        return redirect()->back()->with('success', 'Product created!');
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
        ]);

        $product->update($validated);

        return redirect()->back()->with('success', 'Product updated!');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', ['product' => $product]);
    }

    public function delete(Product $product)
    {
        if ($product->supplier_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $product->delete();

        return redirect()->back()->with('success', 'Product Deleted!');
    }

}
