<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        // Get or create the user's cart
        $cart = Cart::firstOrCreate(
            ['user_id' => auth()->id()],
            ['created_at' => now()]
        );

        // Add or update the cart item
        $item = $cart->items()->updateOrCreate(
            ['product_id' => $product->id],
            ['quantity' => \DB::raw("quantity + {$request->quantity}"), 'price_at_time' => $product->price]
        );

        return redirect()->back()->with('success', 'Product added to cart!');
    }

    public function removeFromCart(Request $request)
    {

    }

    public function checkout()
    {
        $cart = Cart::with('items.product')->where('user_id', auth()->id())->firstOrFail();

        if ($cart->items->isEmpty()) {
            return redirect()->back()->with('error', 'Your cart is empty.');
        }

        // Create the order
        $order = Order::create([
            'user_id' => auth()->id(),
            'total_amount' => $cart->items->sum(fn($item) => $item->quantity * $item->price_at_time),
            'status' => 'pending',
        ]);

        // Create order items
        foreach ($cart->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price_at_time' => $item->price_at_time,
            ]);
        }

        // Clear the cart
        $cart->items()->delete();

        return redirect()->route('orders.index')->with('success', 'Order placed successfully!');
    }

}
