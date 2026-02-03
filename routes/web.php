<?php

use App\Enums\Role;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImportController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SupplierDashboardController;
use App\Http\Controllers\SupplierInfoController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    $user = Auth::user();

    if ($user && $user->role === Role::SUPPLIER->value) {
        return redirect()->route('supplier.dashboard');
    } {
        return redirect()->route('home');
    }
})->name('dashboard');

Route::post('/cart', [CartController::class, 'addToCart'])->name('cart.add');
Route::get('/cart', [CartController::class, 'viewCart'])->name('cart.view');
Route::post('/remove', [CartController::class, 'removeFromCart'])->name('remove');
Route::post('/update-quantity', [CartController::class, 'updateQuantity'])->name('cart.updateQuantity');

// Products (Public View)
Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'index')->name('products.index');
    Route::get('/suppliers/{user}/products', 'supplierProducts')->name('suppliers.products');
    Route::get('/products/{product}', 'view')->name('products.view');
});

// Categories(Public View)
Route::controller(CategoryController::class)->group(function () {
    Route::get('/categories', 'index')->name('categories.index');
    Route::get('/categories/{category}', 'show')->name('categories.show');
});

/*
|--------------------------------------------------------------------------
| Authentication Required Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () {
    // Dashboard

    // Profile Management
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });

    /*
    |--------------------------------------------------------------------------
    | Customer Routes
    |--------------------------------------------------------------------------
    */

    Route::middleware('customer')->group(function () {
        // Cart Management
        Route::controller(CartController::class)->prefix('cart')->name('cart.')->group(function () {
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
        Route::post('/payment', [PaymentController::class, 'processPayment'])->name('payment.process');
    });

    /*
    |--------------------------------------------------------------------------
    | Supplier Routes
    |--------------------------------------------------------------------------
    */

    Route::middleware('supplier')->group(function () {

        Route::get('/supplier/products', [ProductController::class, 'supplierIndex'])
            ->name('supplier.products.index');

        Route::get('/supplier/orders', [OrderController::class, 'supplierIndex'])
            ->name('supplier.orders.index');
        // Product Management
        Route::controller(ProductController::class)->prefix('products')->name('products.')->group(function () {
            Route::post('/', 'store')->name('store');
            Route::get('/edit-product/{product}', 'edit')->name('edit');
            Route::delete('/{product}', 'delete')->name('delete');
            Route::post('/update/{product}', 'update')->name('update');

            Route::get('/supplier/products', [ProductController::class, 'supplierIndex'])
                ->name('supplier.products.index');

            Route::get('/supplier/create-product', [ProductController::class, 'create'])
                ->name('supplier.products.create');

            Route::post('/supplier/products/create-submit', [ProductController::class, 'createSubmit'])
                ->name('supplier.products.create-submit');

            Route::post('/supplier/products/import', [ProductImportController::class, 'import'])
                ->name('supplier.products.import');
        });

        Route::get('/supplier/dashboard', [SupplierDashboardController::class, 'index'])
            ->name('supplier.dashboard');

        // Sales History
        Route::get('/orders/sales-history', [OrderController::class, 'salesHistory'])->name('orders.salesHistory');
        Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
        Route::patch('/orders/{order}/status', [OrderController::class, 'updateOrderStatus'])->name('orders.updateStatus');

        // Supplier Info Management
        Route::controller(SupplierInfoController::class)->prefix('supplier/info')->name('supplier.info.')->group(function () {
            Route::get('/', 'edit')->name('edit');
            Route::patch('/', 'update')->name('update');
        });
    });
});

require __DIR__.'/auth.php';
