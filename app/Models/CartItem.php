<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int|null $user_id
 * @property string|null $cart_token
 * @property int $product_id
 * @property int $quantity
 * @property float $price_at_time
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property-read Product|null $product
 */
class CartItem extends Model
{
    protected $fillable = [
        'user_id',
        'cart_token',
        'product_id',
        'quantity',
        'price_at_time',
    ];

    /**
     * @return BelongsTo<Product, $this>
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
