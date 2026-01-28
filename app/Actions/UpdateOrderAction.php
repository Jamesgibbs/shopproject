<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\Order;
use App\ValueObjects\OrderId;
use Psr\Log\LoggerInterface;

class UpdateOrderAction
{
    public function __construct(
        public Order $order,
        public LoggerInterface $logger
    ) {}

    public function execute(OrderId $orderId): void
    {
        $order = Order::find($orderId->value);

        if (! $order) {
            $this->logger->error('Order not found in ProcessOrderCreated listener', [
                'order_id' => $orderId->value,
            ]);

            return;
        }

        $this->logger->info('Order Created Event Handled via RabbitMQ', [
            'order_id' => $order->id,
            'total_amount' => $order->total_amount,
        ]);
    }
}
