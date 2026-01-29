<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Cart;
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
        $cart = Cart::with('items.product')->where('user_id', auth()->id())->firstOrFail();

        foreach ($cart->items as $item) {
            $product = $item->product;
            if (! $product || $product->stock_quantity < $item->quantity) {
                return redirect()->back()->with(
                    'error',
                    "Insufficient stock for '{$product->name}'. Please adjust your cart."
                );
            }
        }

        try {
            $processPaymentService->processPayment($cart);

            return redirect()->route('orders.index')->with('success', 'Payment successful!');
        } catch (Throwable $exception) {
            return redirect()->back()->with(
                'error',
                "process payment failed. {$exception->getMessage()}"
            );
        }
    }
}
