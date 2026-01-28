<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\DataTransferObjects\SalesHistoryData;
use App\Enums\OrderStatus;
use App\Mail\OrderConfirmation;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Orders\DataTransferObjects\BaseOrderData;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class OrderController extends Controller
{
    public function index(): Response
    {
        $orders = Order::with('items.product')
            ->where('user_id', auth()->id())
            ->get();

        $pendingOrders = $orders->filter(fn ($order) => $order->status === OrderStatus::PENDING->value)->values();
        $otherOrders = $orders->filter(fn ($order) => $order->status !== OrderStatus::PENDING->value)->values();

        return Inertia::render('Orders/Index', [
            'pendingOrders' => $pendingOrders->map(fn ($order) => BaseOrderData::fromModel($order)->toArray()),
            'previousOrders' => $otherOrders->map(fn ($order) => BaseOrderData::fromModel($order)->toArray()),
        ]);
    }

    public function supplierIndex(): Response
    {
        $orders = Order::where('supplier_id', auth()->id())->paginate(20);

        return Inertia::render('Orders/SupplierIndex', [
            'orders' => $orders->through(fn (Order $order) => BaseOrderData::fromModel($order)->toArray()),
        ]);
    }

    public function submit(Request $request): RedirectResponse
    {
        try {
            $cart = Cart::where('user_id', $request->user()->id)->first();

            if (! $cart) {
                return redirect()->back()->with('error', 'Cart not found!');
            }

            $order = Order::create([
                'user_id' => $request->user()->id,
                'cart_id' => $cart->id,
                'status' => 'pending',
                'total_amount' => $cart->total ?? 0,
            ]);

            Mail::to($request->user()->email)->send(new OrderConfirmation($order));

        } catch (Throwable $th) {
            return redirect()->back()->with('error', 'Error creating Order!');
        }

        return redirect()->back()->with('success', 'Order Submitted!');
    }

    public function salesHistory(): Response
    {
        $supplierId = auth()->id();

        /** @var Collection<int, OrderItem> $sales */
        $sales = OrderItem::with(['order.user', 'product'])
            ->whereHas('product', fn ($q) => $q->where('supplier_id', $supplierId))
            ->latest()
            ->get();

        return Inertia::render('Orders/SalesHistory', [
            'sales' => $sales->map(fn (OrderItem $item) => SalesHistoryData::fromModel($item)->toArray()),
        ]);
    }
}
