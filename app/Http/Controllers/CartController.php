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

//        // Add or update the cart item
        $item = $cart->items()->updateOrCreate(
            ['product_id' => $product->id],
            ['quantity' => \DB::raw("quantity + {$request->quantity}"), 'price_at_time' => $product->price]
        );

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
                'product_name' => $item->product->name,
                ]);
        }

        // Clear the cart
        $cart->items()->delete();

        return redirect()->route('dashboard')->with('success', 'Order placed successfully!');
    }

}
