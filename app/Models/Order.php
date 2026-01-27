<?php

namespace App\Models;

use App\Traits\HasDeletedData;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasDeletedData, SoftDeletes;

    protected $fillable = [
        'user_id',
        'status',
        'created_at',
        'total_amount',
        'is_anonymized',
        'anonymized_at'
    ];

    protected function getPersonalDataFields(): array
    {
        return [
            'shipping_address' => 'address',
            'billing_address' => 'address',
            'email_address' => 'email',
            'phone_number' => 'phone',
            'user_id' => 'foreign_key'
        ];
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class); // the buyer
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'supplier_id');
    }

}
