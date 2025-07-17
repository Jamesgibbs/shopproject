<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index()
    {

        if (Auth::user()->role === Role::CUSTOMER->value) {
            $products = Product::all();
        } else {
            $products = Product::where('supplier_id', Auth::id())->get();
        }
        return Inertia::render('Products/Index', ['products' => $products]);
    }

    public function checkPalindrome()
    {

    }


    public function view(Product $product)
    {
        return Inertia::render('Products/Product', ['product' => $product]);
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
        ]);

       $validated['supplier_id'] = Auth::id();


       Product::create($validated);

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
