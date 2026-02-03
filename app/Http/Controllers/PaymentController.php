<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Services\ProcessPaymentService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class PaymentController extends Controller
{
    public function showPaymentForm(): Response
    {
        return Inertia::render('Payment/PaymentForm');
    }

    /**
     * @throws Throwable
     */
    public function processPayment(ProcessPaymentService $processPaymentService): ?RedirectResponse
    {
        $cartItems = CartItem::with('product')->where('user_id', auth()->id())->get();

        if ($cartItems->isEmpty()) {
            return redirect()->back()->with('error', 'Your cart is empty.');
        }

        foreach ($cartItems as $item) {
            $product = $item->product;
            if (! $product || $product->stock_quantity < $item->quantity) {
                return redirect()->back()->with(
                    'error',
                    "Insufficient stock for '{$product->name}'. Please adjust your cart."
                );
            }
        }

        try {
            $processPaymentService->processPayment($cartItems);

            return redirect()->route('orders.index')->with('success', 'Payment successful!');
        } catch (Throwable $exception) {
            return redirect()->back()->with(
                'error',
                "process payment failed. {$exception->getMessage()}"
            );
        }
    }
}
