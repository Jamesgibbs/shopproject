<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Mail\OrderConfirmation;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Orders\DataTransferObjects\BaseOrderData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items.product')
            ->where('user_id', auth()->id())
            ->get();

        $pendingOrders = $orders->filter(fn ($order) => $order->status === 'pending')->values();
        $otherOrders = $orders->filter(fn ($order) => $order->status !== 'pending')->values();

        return Inertia::render('Orders/Index', [
            'pendingOrders' => $pendingOrders->map(fn ($order) => BaseOrderData::fromModel($order)->toArray()),
            'previousOrders' => $otherOrders->map(fn ($order) => BaseOrderData::fromModel($order)->toArray()),
        ]);
    }

    public function supplierIndex()
    {
        $orders = Order::where('supplier_id', auth()->id())->paginate(20);

        return Inertia::render('Orders/SupplierIndex', [
            'orders' => $orders,
        ]);
    }

    public function submit(Request $request)
    {
        try {
            $cart = Cart::where('user_id', $request->user()->id);

            $order = Order::create([
                'user_id' => $request->user()->id,
                'cart_id' => $cart->id,
                'status' => 'pending',
                'total_amount' => $cart->total,
            ]);

            Mail::to($request->user()->email)->send(new OrderConfirmation($order));

        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Error creating Order!');
        }

        return redirect()->back()->with('success', 'Order Submitted!');
    }

    public function salesHistory()
    {
        $supplierId = auth()->id();

        $sales = OrderItem::with(['order.user', 'product'])
            ->whereHas('product', fn ($q) => $q->where('supplier_id', $supplierId))
            ->latest()
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'customer_name' => $item->order?->user?->name ?? '',
                    'product_name' => $item->product->name,
                    'quantity' => $item->quantity,
                    'price' => $item->price_at_time,
                    'order_id' => $item->order->id,
                    'ordered_at' => $item->order->created_at->toDateTimeString(),
                ];
            });

        return Inertia::render('Orders/SalesHistory', [
            'sales' => $sales,
        ]);
    }
}
