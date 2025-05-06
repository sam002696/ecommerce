<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\Validator;

class OrderService
{
    /**
     * Fetch all orders with optional filters (status, payment).
     */
    public function getAllOrders($request)
    {
        $query = Order::with('order_items');

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

    /**
     * Retrieve a single order with all items.
     */
    public function getOrderById($id)
    {
        return Order::with('order_items')->find($id);
    }

    /**
     * Update order status or payment_status.
     */
    public function updateOrder($request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return null;
        }

        // Validate incoming updates
        $validated = Validator::make($request->all(), [
            'status' => 'nullable|in:pending,shipped,delivered,cancelled',
            'payment_status' => 'nullable|in:paid,not paid',
        ])->validate();

        $order->update($validated);

        return $order;
    }
}
