<?php

namespace App\Services\front;

use App\Http\Resources\front\ProductResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;

class ProductFrontendService
{


    public function getAllProductsWithFilters($request)
    {
        $query = Product::where('status', 1);

        // Filter by multiple category IDs (comma-separated)
        if (!empty($request->category_id)) {
            $categoryIds = explode(',', $request->category_id);
            $query->whereIn('category_id', $categoryIds);
        }

        if (!empty($request->brand_id)) {
            $brandIds = explode(',', $request->brand_id);
            $query->whereIn('brand_id', $brandIds);
        }


        $products = $query->orderBy('created_at', 'desc')->paginate(10);

        return [
            'products' => ProductResource::collection($products),
            'pagination' => [
                'current_page' => $products->currentPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
                'total_pages' => $products->lastPage(),
                'has_more_pages' => $products->hasMorePages(),
            ]
        ];
    }



    public function getsingleProduct($id)
    {
        return Product::with(['product_images', 'product_size'])
            ->find($id);
    }




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


    public function getFeaturedProducts($limit = 3)
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
