<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function viewCart()
    {
        $cart = Cart::with('items.product')->where('user_id', auth()->id())->first();

        if (!$cart) {
            return Inertia::render('Cart/ViewCart', ['cartItems' => []]);
        }
        return Inertia::render('Cart/ViewCart', [
            'cartItems' => $cart->items->map(function ($item) {
                return [
                    'id' => $item->id,
                    'product_id' => $item->product->id,
                    'name' => $item->product->name,
                    'price' => $item->product->price,
                    'stock_quantity' => $item->quantity,
                ];
            }),
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

       if (!$cart) {
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

        foreach ($cart->items as $item) {
            $product = $item->product;
            if (!$product || $product->stock_quantity < $item->quantity) {
                return redirect()->back()->with(
                    'error',
                    "Insufficient stock for '{$product->name}'. Please adjust your cart."
                );
            }
        }

        $order = Order::create([
            'user_id' => auth()->id(),
            'total_amount' => $cart->items->sum(fn($item) => $item->quantity * $item->price_at_time),
            'status' => 'pending',
        ]);

        foreach ($cart->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price_at_time' => $item->price_at_time,
                'product_name' => $item->product->name,
                ]);

            $product = $item->product;
            if ($product && $product->stock_quantity >= $item->quantity) {
                $product->decrement('stock_quantity', $item->quantity);
            } else {
                if ($product->stock_quantity < $item->quantity) {
                    return redirect()->back()->with('error', "Not enough stock for {$product->name}.");
                }
            }
        }

        // Clear the cart
        $cart->items()->delete();

        return redirect()->route('dashboard')->with('success', 'Order placed successfully!');
    }

}
