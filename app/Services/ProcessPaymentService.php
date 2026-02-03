<?php

declare(strict_types=1);

namespace App\Services;

use App\Mail\OrderConfirmation;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ProcessPaymentService
{
    /**
     * @param Collection<int, CartItem> $cartItems
     * @throws Throwable
     */
    public function processPayment(Collection $cartItems): void
    {
        DB::transaction(function () use ($cartItems) {

            $order = Order::create([
                'user_id' => auth()->id(),
                'total_amount' => $cartItems->sum(fn ($item) => $item->quantity * $item->price_at_time),
                'status' => 'pending',
            ])->load('user');

            foreach ($cartItems as $item) {
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
                }
            }

            Mail::to(auth()->user()->email)->send(new OrderConfirmation($order));

            // Clear the cart
            CartItem::where('user_id', auth()->id())->delete();

        });
    }
}
