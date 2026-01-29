<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Enums\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\CartItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     *
     * @throws Throwable
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = $request->user();
        $cartToken = session()->get('cart_token');

        if ($cartToken) {
            DB::transaction(function () use ($cartToken, $user) {
                $guestItems = CartItem::where('cart_token', $cartToken)->get();

                foreach ($guestItems as $item) {
                    $existing = CartItem::where('user_id', $user->id)
                        ->where('product_id', $item->product_id)
                        ->first();

                    if ($existing) {
                        $existing->update([
                            'quantity' => $existing->quantity + $item->quantity,
                        ]);
                        $item->delete();
                    } else {
                        $item->update([
                            'user_id' => $user->id,
                            'cart_token' => null,
                        ]);
                    }
                }
            });

            session()->forget('cart_token');
        }

        return $user->role === Role::SUPPLIER->value
            ? redirect()->route('supplier.dashboard')
            : redirect()->route('dashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
