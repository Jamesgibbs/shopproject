<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasDeletedData;

class BillingAddress extends Model
{
    use HasDeletedData;

    protected $fillable = [
        'user_id',
        'billing_name',
        'billing_address',
        'email_address',
        'phone_number',
        'is_default'
    ];

    protected function getPersonalDataFields(): array
    {
        return [
            'billing_name' => 'text',
            'billing_address' => 'address',
            'email_address' => 'email',
            'phone_number' => 'phone'
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
