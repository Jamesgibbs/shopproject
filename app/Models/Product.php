<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'supplier_id',
        'stock_quantity',
    ];

    public function supplier()
    {
        return $this->belongsTo(User::class, 'supplier_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
