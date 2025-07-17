<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function showPaymentForm(): Response
    {
        return Inertia::render('Payment/PaymentForm');
    }

}
