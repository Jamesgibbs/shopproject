<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ProductController extends Controller
{
    public function supplierIndex(): Response
    {
        $products = Product::where('supplier_id', auth()->id())->paginate(20);

        return Inertia::render('Products/SupplierIndex', [
            'products' => $products,
        ]);
    }

    public function index(): Response
    {
        $query = Product::with('supplier')
//            ->when(auth()?->user()?->role === Role::SUPPLIER->value, function ($query) {
//                $query->where('supplier_id', auth()->id());
//            })
            ->orderBy('created_at', 'desc');

        $products = $query->paginate(10);

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    public function view(Product $product): Response
    {
        $product->load([
            'supplier:id,name', // supplier
             'reviews' => function ($query) {
            $query->with('user:id,name')->latest();
            },
        ]);

        return Inertia::render('Products/Product', [
            'product' => array_merge($product->toArray(), [
                'average_rating' => $product->average_rating,
                'reviews_count' => $product->reviews_count,
                'supplier_id' => $product->supplier_id,
                'supplier_name' => $product->supplier?->name,
            ]),
        ]);
    }

    public function create(Request $request): RedirectResponse
    {
        try {

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0|max:999999.99',
                'stock_quantity' => 'required|integer|min:0|max:1000000',
            ]);

            $validated['supplier_id'] = Auth::id();

            Product::create($validated);
        } catch (Throwable $th) {
            Log::debug('creating Product failed', [$th]);
        }

        return redirect()->back();
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $validated['supplier_id'] = Auth::id();

        $product = Product::create($validated);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $product->images()->create([
                'path' => $path,
                'alt' => $validated['name'],
            ]);
        }

        return back()->with('success', 'Product created!');
    }


    public function update(Request $request, Product $product): RedirectResponse
    {
        $this->authorize('update', $product);

        $validated = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'stock_quantity' => 'required|integer',
            'categories' => 'array',
            'categories.*' => 'exists:categories,id',
        ]);

        $product->update($validated);

        // Sync pivot table
        $product->categories()->sync($validated['categories'] ?? []);

        return redirect()->route('supplier.products.index')->with('success', 'Product updated.');
    }

    public function edit(Product $product): Response
    {
        $this->authorize('update', $product);

        return Inertia::render('Products/Edit', [
            'product' => $product->load('categories'),
            'categories' => Category::all(),
            'selectedCategory' => $product->categories->pluck('id'),
        ]);
    }

    public function delete(Product $product): RedirectResponse
    {
        $this->authorize('delete', $product);

        $product->delete();

        return redirect()->back()->with('success', 'Product Deleted!');
    }

    public function supplierProducts(User $user): Response
    {
        $products = Product::where('supplier_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return Inertia::render('Products/SupplierProducts', [
            'supplier' => [
                'id' => $user->id,
                'name' => $user->name,
                'supplier_overview' => $user->supplier_overview
            ],
            'products' => $products,
        ]);
    }
}
