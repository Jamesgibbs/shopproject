<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasDeletedData;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property int $user_id
 * @property string $status
 * @property float $total_amount
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property bool $is_anonymized
 * @property Carbon|null $anonymized_at
 * @property-read User $user
 * @property-read Collection<int, \App\Models\OrderItem> $items
 */
class Order extends Model
{
    use HasDeletedData, HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'status',
        'created_at',
        'total_amount',
        'is_anonymized',
        'anonymized_at',
    ];

    protected function getPersonalDataFields(): array
    {
        return [
            'shipping_address' => 'address',
            'billing_address' => 'address',
            'email_address' => 'email',
            'phone_number' => 'phone',
            'user_id' => 'foreign_key',
        ];
    }

    /**
     * @return HasMany<OrderItem, $this>
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class); // the buyer
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function supplier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'supplier_id');
    }
}
