<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = [
        'product_id',
        'quantity',
        'price_at_time',
        'created_at',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
