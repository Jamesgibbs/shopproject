<?php

declare(strict_types=1);

namespace App\Services;

use App\Mail\OrderConfirmation;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ProcessPaymentService
{
    /**
     * @throws Throwable
     */
    public function processPayment(Cart $cart): void
    {
        DB::transaction(function () use ($cart) {

            $order = Order::create([
                'user_id' => auth()->id(),
                'total_amount' => $cart->items->sum(fn ($item) => $item->quantity * $item->price_at_time),
                'status' => 'pending',
            ])->load('user');

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

            Mail::to(auth()->user()->email)->send(new OrderConfirmation($order));

            // Clear the cart
            $cart->items()->delete();

        });
    }
}
