<?php

namespace App\Actions;

use App\Models\CartItem;
use App\Models\Product;

class AddToCart
{
    public function execute(Product $product, int $quantity): void
    {
        $userId = auth()->id();

        // Check if item exists in cart
        $cartItem = CartItem::where('user_id', $userId)
            ->where('product_id', $product->id)
            ->first();

        if ($cartItem instanceof CartItem) {
            $cartItem->update([
                'quantity' => $this->calculateNewQuantity($cartItem, $quantity),
                'price_at_time' => $product->price,
            ]);

            return;
        }

        CartItem::create([
            'user_id' => $userId,
            'product_id' => $product->id,
            'quantity' => $quantity,
            'price_at_time' => $product->price,
        ]);
    }

    private function calculateNewQuantity(CartItem $cartItem, int $quantity): int
    {
        return $cartItem->quantity + $quantity;
    }
}
