<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Product;
use App\Models\User;

class ProductPolicy
{
    /**
     * Determine if the user can update/edit the product.
     */
    public function update(User $user, Product $product): bool
    {
        return $user->id === $product->supplier_id;
    }

    /**
     * Determine if the user can delete the product.
     */
    public function delete(User $user, Product $product): bool
    {
        return $user->id === $product->supplier_id;
    }
}
