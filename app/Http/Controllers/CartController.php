<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\DataTransferObjects\CartItemData;
use App\Models\CartItem;
use App\Models\Product;
use App\Services\AddToCartService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class CartController extends Controller
{
    public function viewCart(): Response
    {
        $userId = auth()->id();
        $cartToken = session()->get('cart_token');

        // Determine identifier
        $identifier = $userId
            ? ['user_id' => $userId]
            : ['cart_token' => $cartToken];

        // Fetch cart items with products
        $cartItems = CartItem::where($identifier)
            ->with(['product.images', 'product.supplier'])
            ->get()
            ->filter(fn (CartItem $item) => $item->product !== null)
            ->map(fn (CartItem $item) => CartItemData::fromModel($item)->toArray())
            ->values()
            ->all();

        return Inertia::render('Cart/ViewCart', [
            'cartItems' => $cartItems,
        ]);
    }

    /**
     * @throws Throwable
     */
    public function addToCart(Request $request, AddToCartService $service): RedirectResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'integer', 'exists:products,id'],
        ]);

        // Determine identifier (user or guest)
        $userId = auth()->id();
        $cartToken = null;

        if (! $userId) {
            $cartToken = session()->get('cart_token');

            if (! $cartToken) {
                $cartToken = Str::uuid()->toString();
                session()->put('cart_token', $cartToken);
            }
        }

        try {
            $service->add(
                productId: $validated['product_id'],
                quantity: 1,
                userId: $userId,
                cartToken: $cartToken,
            );
        } catch (Throwable) {
            return back()->with('error', 'Product not added to cart!');
        }

        return back()->with('success', 'Product added to cart!');
    }

    public function removeFromCart(Request $request): RedirectResponse
    {
        $cartItem = CartItem::where('id', $request->id)
            ->where(function ($query) {
                $query->where('user_id', auth()->id())
                    ->orWhere('cart_token', session()->get('cart_token'));
            })
            ->first();

        if ($cartItem) {
            $cartItem->delete();

            return redirect()->back()->with('success', 'Product removed from cart!');
        }

        return redirect()->back()->with('error', 'Item not found in your cart.');
    }

    public function checkout(): RedirectResponse
    {
        $userId = auth()->id();
        $cartToken = session()->get('cart_token');

        $identifier = $userId
            ? ['user_id' => $userId]
            : ['cart_token' => $cartToken];

        $hasItems = CartItem::where($identifier)->exists();

        if (! $hasItems) {
            return redirect()->back()->with('error', 'Your cart is empty.');
        }

        return redirect()->route('payment.form');
    }

    public function updateQuantity(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'cart_item_id' => 'required|exists:cart_items,id',
            'quantity' => 'required|integer|min:1',
            'product_id' => 'required|integer|min:1',
        ]);

        $product = Product::where('id', $validated['product_id'])->first();
        if ($validated['quantity'] > $product->stock_quantity) {
            return redirect()->back()->with('error', 'No more stock available!');
        }

        $cartItem = CartItem::where('id', $validated['cart_item_id'])
            ->where(function ($query) {
                $query->where('user_id', auth()->id())
                    ->orWhere('cart_token', session()->get('cart_token'));
            })
            ->firstOrFail();

        $cartItem->update([
            'quantity' => $validated['quantity'],
        ]);

        return redirect()->back()->with('success', 'Quantity updated!');
    }
}
