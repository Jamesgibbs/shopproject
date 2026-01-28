<?php

namespace App\Models;

use App\Traits\HasDeletedData;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property string $billing_name
 * @property string $billing_address
 * @property string $email_address
 * @property string $phone_number
 * @property bool $is_default
 * @property bool $is_anonymized
 * @property Carbon|null $anonymized_at
 */
class BillingAddress extends Model
{
    use HasDeletedData;

    protected $fillable = [
        'user_id',
        'billing_name',
        'billing_address',
        'email_address',
        'phone_number',
        'is_default',
    ];

    protected function getPersonalDataFields(): array
    {
        return [
            'billing_name' => 'text',
            'billing_address' => 'address',
            'email_address' => 'email',
            'phone_number' => 'phone',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
