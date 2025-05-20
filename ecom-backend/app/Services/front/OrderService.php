<?php

namespace App\Services\front;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Validator;

class OrderService
{
    public function storeOrder($request)
    {
        if (empty($request->cart)) {
            throw new \Exception('Cart is empty');
        }

        // Basic validation
        Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'mobile' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip' => 'required|string',
            'payment_status' => 'in:paid,not paid',
            'status' => 'in:pending,shipped,delivered,cancelled',
        ])->validate();

        // Save Order
        $order = new Order();
        $order->name = $request->name;
        $order->email = $request->email;
        $order->mobile = $request->mobile;
        $order->address = $request->address;
        $order->city = $request->city;
        $order->state = $request->state;
        $order->zip = $request->zip;
        $order->subtotal = $request->subtotal;
        $order->grand_total = $request->grand_total;
        $order->discount = $request->discount ?? 0;
        $order->shipping = $request->shipping;
        $order->payment_status = $request->payment_status ?? 'not paid';
        $order->status = $request->status ?? 'pending';
        $order->user_id = $request->user()->id;
        $order->save();

        // Save Order Items
        foreach ($request->cart as $item) {
            $orderItem = new OrderItem();
            $orderItem->order_id = $order->id;
            $orderItem->product_id = $item['product_id'];
            $orderItem->qty = $item['qty'];
            $orderItem->unit_price = $item['price'];
            $orderItem->price = $item['qty'] * $item['price'];
            $orderItem->size = $item['size'] ?? null;
            $orderItem->name = $item['name'] ?? '';
            $orderItem->save();
        }

        return $order;
    }

    public function fetchOrderDetails($orderId, $userId)
    {
        $order = Order::where('id', $orderId)
            ->where('user_id', $userId)
            ->with('order_items.product')
            ->firstOrFail();

        return new OrderResource($order);
    }

    public function fetchAllOrders($request)
    {
        $query = Order::where('user_id', $request->user()->id)->with('order_items');

        // Optional filtering
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        $orders = $query->orderBy('created_at', 'desc')->paginate(10);

        return [
            'orders' => $orders->items(),
            'pagination' => [
                'current_page' => $orders->currentPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
                'total_pages' => $orders->lastPage(),
                'has_more_pages' => $orders->hasMorePages(),
            ]
        ];
    }
}
