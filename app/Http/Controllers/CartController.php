<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function viewCart()
    {
        $cart = Cart::with('items.product')->where('user_id', auth()->id())->first();

        if (! $cart) {
            return Inertia::render('Cart/ViewCart', ['cartItems' => []]);
        }

        // Only show cart items where the product exists and isn't deleted
        $cartItems = $cart->items->filter(function ($item) {
            return $item->product !== null;
        })->map(function ($item) {
            return [
                'id' => $item->id,
                'product_id' => $item->product->id,
                'name' => $item->product->name,
                'price' => $item->product->price,
                'quantity' => $item->quantity,
            ];
        })->values()->all();

        return Inertia::render('Cart/ViewCart', [
            'cartItems' => $cartItems,
        ]);

    }

    public function addToCart(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        $cart = Cart::firstOrCreate(
            ['user_id' => auth()->id()],
            ['created_at' => now()]
        );

        // Check if item exists in cart
        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            $cartItem->update([
                'quantity' => $cartItem->quantity + $validated['quantity'],
                'price_at_time' => $product->price,
            ]);
        } else {
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $validated['quantity'],
                'price_at_time' => $product->price,
            ]);
        }

        return redirect()->back()->with('success', 'Product added to cart!');
    }

    public function removeFromCart(Request $request)
    {
        $cart = Cart::where('user_id', auth()->id())->first();

        if (! $cart) {
            return redirect()->back()->with('error', 'No cart found.');
        }

        $cartItem = $cart->items()->where('id', $request->id)->first();

        if ($cartItem) {
            $cartItem->delete();

            return redirect()->back()->with('success', 'Product removed from cart!');
        }

        return redirect()->back()->with('error', 'Item not found in your cart.');
    }

    public function checkout()
    {
        $cart = Cart::with('items.product')->where('user_id', auth()->id())->firstOrFail();

        if ($cart->items->isEmpty()) {
            return redirect()->back()->with('error', 'Your cart is empty.');
        }

        return redirect()->route('payment.form');
    }

    public function updateQuantity(Request $request)
    {
        $validated = $request->validate([
            'cart_item_id' => 'required|exists:cart_items,id',
            'quantity' => 'required|integer|min:1',
            'product_id' => 'required|integer|min:1',
        ]);

        $product = Product::where('id', $validated['product_id'])->first();
        if ($validated['quantity'] > $product->stock_quantity) {
            return redirect()->back()->with('error', 'No more stock available!');
        }

        $cart = Cart::where('user_id', auth()->id())->firstOrFail();
        $cartItem = $cart->items()->findOrFail($validated['cart_item_id']);

        $cartItem->update([
            'quantity' => $validated['quantity'],
        ]);

        return redirect()->back()->with('success', 'Quantity updated!');
    }
}
