<?php

declare(strict_types=1);

namespace App\Orders\DataTransferObjects;

use Illuminate\Support\Collection;

readonly class BaseOrderData
{
    /** * @param Collection<OrderItemData> $items */
    public function __construct(
        protected readonly int $id,
        protected readonly ?string $customerName,
        protected readonly float $total,
        protected readonly string $status,
        protected Collection $items,
        protected readonly string $orderedAt
    ) {}

    public static function fromModel($order): self
    {
        return new self(
            id: $order->id,
            customerName: $order?->user?->name,
            total: $order->total_amount,
            status: $order->status,
            items: $order->items->map(fn ($item) => OrderItemData::fromModel($item)),
            orderedAt: $order->created_at->toDateTimeString(), );
    }

    /**
     * @return array<string,mixed>
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'customer_name' => $this->customerName,
            'total' => $this->total,
            'status' => $this->status,
            'items' => $this->items->map(fn ($i) => $i->toArray()),
            'ordered_at' => $this->orderedAt,
        ];
    }
}
