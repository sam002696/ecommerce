<?php


namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;

class DashboardService
{
    public function getStats(): array
    {
        return [
            'orders_count' => Order::count(),
            'products_count' => Product::count(),
            'users_count' => User::count(),
            'total_revenue' => Order::sum('grand_total'),
        ];
    }
}
