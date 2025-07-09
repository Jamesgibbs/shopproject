<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/{product}', [ProductController::class, 'view'])->name('products.view');
    Route::post('/checkout', [CartController::class, 'checkout'])->name('cart.checkout');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::post('/orders', [OrderController::class, 'submit'])->name('orders.submit');
});

Route::post('/cart', [CartController::class, 'addToCart'])->name('cart.add');
Route::get('/view-cart', [CartController::class, 'viewCart'])->name('cart.view');
Route::get('/remove-from-cart', [CartController::class, 'removeFromCart'])->name('cart.remove');


Route::middleware(['auth', 'verified','supplier'])->group(function () {
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::delete('/products/{product}', [ProductController::class, 'delete'])->name('products.delete');
    Route::get('/orders/sales-history', [OrderController::class, 'salesHistory'])->name('orders.salesHistory');
});


require __DIR__.'/auth.php';
