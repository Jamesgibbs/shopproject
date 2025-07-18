<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Auth::check() ? redirect()->route('dashboard') : redirect()->route('login');
})->name('home');

/*
|--------------------------------------------------------------------------
| Authentication Required Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    // Profile Management
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });

    // Products (Public View)
    Route::controller(ProductController::class)->group(function () {
        Route::get('/products', 'index')->name('products.index');
        Route::get('/products/{product}', 'view')->name('products.view');
    });

    /*
    |--------------------------------------------------------------------------
    | Customer Routes
    |--------------------------------------------------------------------------
    */

    Route::middleware('customer')->group(function () {
        // Cart Management
        Route::controller(CartController::class)->prefix('cart')->name('cart.')->group(function () {
            Route::post('/', 'addToCart')->name('add');
            Route::get('/', 'viewCart')->name('view');
            Route::post('/remove', 'removeFromCart')->name('remove');
            Route::post('/checkout', 'checkout')->name('checkout');
        });

        // Order Management
        Route::controller(OrderController::class)->prefix('orders')->name('orders.')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'submit')->name('submit');
        });

        // Billing Information
        Route::controller(ProfileController::class)->prefix('profile')->name('profile.')->group(function () {
            Route::get('/billing-info', 'addBillingInfo')->name('billinginfoform');
            Route::post('/billing-info', 'saveBillingInfo')->name('savebillinginfo');
        });

        // Payment
        Route::get('/payment', [PaymentController::class, 'showPaymentForm'])->name('payment.form');
        Route::post('/payment', [PaymentController::class, 'processPayment'])->name('payment.process');;
    });

    /*
    |--------------------------------------------------------------------------
    | Supplier Routes
    |--------------------------------------------------------------------------
    */

    Route::middleware('supplier')->group(function () {
        // Product Management
        Route::controller(ProductController::class)->prefix('products')->name('products.')->group(function () {
            Route::post('/', 'store')->name('store');
            Route::get('/edit-product/{product}', 'edit')->name('edit');
            Route::delete('/{product}', 'delete')->name('delete');
            Route::post('/update/{product}', 'update')->name('update');
        });

        // Sales History
        Route::get('/orders/sales-history', [OrderController::class, 'salesHistory'])->name('orders.salesHistory');
    });
});

require __DIR__.'/auth.php';
