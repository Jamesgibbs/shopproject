<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class OrderConfirmation extends Mailable
{
    public function __construct(private readonly Order $order) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Order Confirmation #'.$this->order->id,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.orders.confirmation',
            with: [
                'order' => $this->order,
                'customerName' => $this->order?->user?->name,
            ],
        );
    }
}
