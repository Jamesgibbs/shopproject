<?php

namespace App\Actions;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;

class AddToCart
{
    public function execute(Product $product, int $quantity)
    {
        $cart = Cart::firstOrCreate(
            ['user_id' => auth()->id()],
            ['created_at' => now()]
        );

        // Check if item exists in cart
        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if ($cartItem instanceof CartItem) {
            return $cartItem->update([
                'quantity' => $this->calculateNewQuantity($cartItem, $quantity),
                'price_at_time' => $product->price,
            ]);
        }

        return $cart->items()->create([
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
