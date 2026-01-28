<?php

namespace App\Listeners;

use App\Events\OrderShipped;
use App\Mail\OrderConfirmation;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendOrderDetailsEmail implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(OrderShipped $event): void
    {
        $order = $event->order;

        Mail::to($order?->user?->email)->send(new OrderConfirmation($order));
    }
}
