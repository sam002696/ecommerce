<?php

namespace App\Services\front;

use App\Events\BroadcastOrderNotification;
use App\Events\OrderPlaced;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;

class OrderService
{
    public function storeOrder($request)
    {
        if (empty($request->cart)) {
            throw new \Exception('Cart is empty');
        }

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

        $order = new Order();
        $order->fill($request->only([
            'name',
            'email',
            'mobile',
            'address',
            'city',
            'state',
            'zip',
            'subtotal',
            'grand_total',
            'discount',
            'shipping'
        ]));
        $order->payment_status = $request->payment_status ?? 'not paid';
        $order->status = $request->status ?? 'pending';
        $order->user_id = $request->user()->id;
        $order->save();

        foreach ($request->cart as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'qty' => $item['qty'],
                'unit_price' => $item['price'],
                'price' => $item['qty'] * $item['price'],
                'size' => $item['size'] ?? null,
                'name' => $item['name'] ?? '',
            ]);
        }

        $order->load('order_items');
        event(new OrderPlaced($order));
        event(new BroadcastOrderNotification($order));

        // Clear frontend order cache for user
        $this->clearUserOrderCache($order->user_id);
        // Clear admin order list cache
        $this->clearAdminOrderListCache();

        return $order;
    }

    public function fetchOrderDetails($orderId, $userId)
    {
        $cacheKey = "user:{$userId}:order:{$orderId}";

        if (Redis::exists($cacheKey)) {
            return json_decode(Redis::get($cacheKey), true);
        }

        $order = Order::where('id', $orderId)
            ->where('user_id', $userId)
            ->with('order_items.product')
            ->firstOrFail();

        Redis::setex($cacheKey, 300, json_encode($order)); // Cache for 5 mins

        return $order;
    }

    public function fetchAllOrders($request)
    {
        $userId = $request->user()->id;
        $cacheKey = $this->generateUserOrderCacheKey($request, $userId);

        if (Redis::exists($cacheKey)) {
            return json_decode(Redis::get($cacheKey), true);
        }

        $query = Order::where('user_id', $userId)
            ->with('order_items.product');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        $orders = $query->orderBy('created_at', 'desc')->paginate(10);

        $response = [
            'orders' => $orders->items(),
            'pagination' => [
                'current_page' => $orders->currentPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
                'total_pages' => $orders->lastPage(),
                'has_more_pages' => $orders->hasMorePages(),
            ]
        ];

        Redis::setex($cacheKey, 300, json_encode($response)); // Cache for 5 mins

        return $response;
    }

    private function generateUserOrderCacheKey($request, $userId): string
    {
        $params = [
            'page' => $request->get('page', 1),
            'status' => $request->get('status', ''),
            'payment_status' => $request->get('payment_status', '')
        ];

        return 'user:' . $userId . ':orders:' . md5(json_encode($params));
    }

    private function clearUserOrderCache($userId): void
    {
        $keys = Redis::keys("user:{$userId}:orders:*");
        $keys = array_merge($keys, Redis::keys("user:{$userId}:order:*"));

        foreach ($keys as $key) {
            Redis::del($key);
        }
    }

    private function clearAdminOrderListCache(): void
    {
        $keys = Redis::keys('admin:orders:*');

        foreach ($keys as $key) {
            Redis::del($key);
        }
    }
}
