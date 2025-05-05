<?php

namespace App\Services\front;

use App\Models\Brand;
use App\Models\Category;
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


    /**
     * Get all categories.
     */
    public function getCategories()
    {
        $categories = Category::orderBy('name', 'asc')
            ->where('status', 1)
            ->get();


        return $categories;
    }

    public function getBrands()
    {
        $brands = Brand::orderBy('name', 'asc')
            ->where('status', 1)
            ->get();

        return $brands;
    }
}
