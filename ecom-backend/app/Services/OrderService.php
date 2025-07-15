<?php

namespace App\Services;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;

class OrderService
{
    /**
     * Fetch all orders with optional filters (status, payment).
     */
    public function getAllOrders($request)
    {
        $cacheKey = $this->generateAdminOrderCacheKey($request);

        if (Redis::exists($cacheKey)) {
            return json_decode(Redis::get($cacheKey), true);
        }

        $query = Order::with('order_items');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        $orders = $query->orderBy('created_at', 'desc')->paginate(10);

        $response = [
            'orders' => OrderResource::collection($orders),
            'pagination' => [
                'current_page' => $orders->currentPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
                'total_pages' => $orders->lastPage(),
                'has_more_pages' => $orders->hasMorePages(),
            ]
        ];

        Redis::setex($cacheKey, 300, json_encode($response)); // TTL: 5 mins

        return $response;
    }

    /**
     * Retrieve a single order with all items.
     */
    public function getOrderById($id)
    {
        return Order::with('order_items', 'order_items.product')->find($id);
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

        $this->clearOrderListCache();

        $this->clearFrontendUserOrderCache($order->user_id);


        return $order;
    }




    /**
     * Clears all cached admin order list entries.
     */
    private function clearOrderListCache(): void
    {
        $keys = Redis::keys('admin:orders:*');

        foreach ($keys as $key) {
            Redis::del($key);
        }
    }

    /**
     * Generate cache key for admin order listing with filters & pagination.
     */
    private function generateAdminOrderCacheKey($request): string
    {
        $params = [
            'page' => $request->get('page', 1),
            'status' => $request->get('status', ''),
            'payment_status' => $request->get('payment_status', ''),
        ];

        return 'admin:orders:' . md5(json_encode($params));
    }



    private function clearFrontendUserOrderCache($userId): void
    {
        $keys = Redis::keys("user:{$userId}:orders:*");
        $keys = array_merge($keys, Redis::keys("user:{$userId}:order:*"));

        foreach ($keys as $key) {
            Redis::del($key);
        }
    }
}
