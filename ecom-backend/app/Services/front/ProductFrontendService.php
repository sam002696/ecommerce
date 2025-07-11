<?php

namespace App\Services\front;

use App\Http\Resources\front\ProductResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Cache;

class ProductFrontendService
{


    public function getAllProductsWithFilters($request)
    {
        $cacheKey = $this->generateProductCacheKey($request);

        // Cache for 10 minutes
        $cached = Cache::remember($cacheKey, 600, function () use ($request) {
            $query = Product::where('status', 1);

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
        });

        return $cached;
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



    private function generateProductCacheKey($request): string
    {
        $params = [
            'page' => $request->get('page', 1),
            'category_id' => $request->get('category_id', ''),
            'brand_id' => $request->get('brand_id', ''),
            'sort' => $request->get('sort', 'created_at_desc'),
        ];

        $key = 'products:' . md5(json_encode($params));

        return $key;
    }
}
