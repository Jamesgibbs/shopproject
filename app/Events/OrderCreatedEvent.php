<?php

declare(strict_types=1);

namespace App\Events;

use App\ValueObjects\OrderId;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderCreatedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public $queue = 'order-created';

    /**
     * Create a new event instance.
     */
    public function __construct(public OrderId $orderId)
    {
        //
    }
}
