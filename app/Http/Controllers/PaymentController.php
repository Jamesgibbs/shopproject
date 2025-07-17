<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function showPaymentForm(): Response
    {
        return Inertia::render('Payment/PaymentForm');
    }

    public function processPayment()
    {
        $cart = Cart::with('items.product')->where('user_id', auth()->id())->firstOrFail();

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

    }

}
