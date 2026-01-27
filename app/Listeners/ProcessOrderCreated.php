<?php

namespace App\Listeners;

use App\Actions\UpdateOrderAction;
use App\Events\OrderCreatedEvent;
use App\Models\Order;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class ProcessOrderCreated implements ShouldQueue
{
    use InteractsWithQueue;

    public $queue = 'order-created';

    public function __construct(protected readonly UpdateOrderAction $action)
    {

    }

    /**
     * Handle the event.
     */
    public function handle(OrderCreatedEvent $event): void
    {
        $this->action->execute($event->orderId);
    }
}
