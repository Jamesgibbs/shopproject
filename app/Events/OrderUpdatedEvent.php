<?php

declare(strict_types=1);

namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderUpdatedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public $queue = 'order-updated';

    /**
     * Create a new event instance.
     */
    public function __construct(public Order $order)
    {
        //
    }
}
