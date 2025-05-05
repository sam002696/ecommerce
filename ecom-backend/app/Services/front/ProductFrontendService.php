<?php

namespace App\Services\front;

use App\Models\Product;

class ProductFrontendService
{
    /**
     * Get the latest active products.
     */
    public function getLatestProducts($limit = 8)
    {
        return Product::with('product_images')
            ->where('status', 1)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }


    public function getFeaturedProducts($limit = 8)
    {
        return Product::with('product_images')
            ->where('status', 1)
            ->where('is_featured', 'yes')
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }
}
