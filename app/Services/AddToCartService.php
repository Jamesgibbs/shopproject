<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Throwable;

class AddToCartService
{
    /**
     * @throws Throwable
     */
    public function add(int $productId, int $quantity, int $userId): void
    {
        DB::transaction(function () use ($productId, $quantity, $userId) {

            /** @var Product $product */
            $product = Product::query()->findOrFail($productId);

            /** @var Cart $cart */
            $cart = Cart::firstOrCreate(
                ['user_id' => $userId],
                ['created_at' => now()]
            );

            /** @var CartItem|null $cartItem */
            $cartItem = $cart->items()
                ->where('product_id', $product->id)
                ->lockForUpdate() // prevents race conditions
                ->first();

            $payload = [
                'product_id' => $product->id,
                'price_at_time' => $product->price,
            ];

            if ($cartItem) {
                $cartItem->update([
                    ...$payload,
                    'quantity' => $cartItem->quantity + $quantity,
                ]);
            } else {
                $cart->items()->create([
                    ...$payload,
                    'quantity' => $quantity,
                ]);
            }
        });
    }
}
