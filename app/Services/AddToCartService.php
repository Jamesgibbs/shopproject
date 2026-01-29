<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Throwable;

class AddToCartService
{
    /**
     * @throws Throwable
     */
    public function add(int $productId, int $quantity, ?int $userId, ?string $cartToken): void
    {
        DB::transaction(function () use ($productId, $quantity, $userId, $cartToken) {

            $product = Product::findOrFail($productId);

            // Build identifier based on user or guest
            $identifier = $userId
                ? ['user_id' => $userId]
                : ['cart_token' => $cartToken];

            // Find existing cart item
            $cartItem = CartItem::where($identifier)
                ->where('product_id', $productId)
                ->lockForUpdate()
                ->first();

            if ($cartItem) {
                // Update quantity
                $cartItem->update([
                    'quantity' => $cartItem->quantity + $quantity,
                ]);
            } else {
                // Create new cart item
                CartItem::create([
                    ...$identifier,
                    'product_id' => $productId,
                    'quantity' => $quantity,
                    'price_at_time' => $product->price,
                ]);
            }
        });
    }
}
