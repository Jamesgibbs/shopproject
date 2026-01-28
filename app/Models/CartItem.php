<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $cart_id
 * @property int $product_id
 * @property int $quantity
 * @property float $price_at_time
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property-read Cart $cart
 * @property-read Product|null $product
 */
class CartItem extends Model
{
    protected $fillable = [
        'product_id',
        'quantity',
        'price_at_time',
        'created_at',
    ];

    /**
     * @return BelongsTo<Product, $this>
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * @return BelongsTo<Cart, $this>
     */
    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }
}
