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

//Route::middleware(['auth', 'verified'])->group(function () {

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::post('/products', [ProductController::class, 'store'])->name('products.store');
Route::delete('/products/{product}', [ProductController::class, 'delete'])->name('products.delete');

Route::post('/cart', [CartController::class, 'addToCart'])->name('cart.add');
Route::post('/checkout', [CartController::class, 'checkout'])->name('cart.checkout');


Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
Route::post('/orders', [OrderController::class, 'submit'])->name('orders.submit');

//Route::get('/tasks/export', [TaskController::class, 'export'])->name('tasks.export');
//
//Route::post('/tasks/bulk-delete', [TaskController::class, 'bulkDelete']);
//
//Route::post('/tasks/bulk-complete', [TaskController::class, 'bulkComplete']);
//});


require __DIR__.'/auth.php';
