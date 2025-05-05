<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\ApiResponseService;
use App\Services\front\ProductFrontendService;
use Exception;

class ProductController extends Controller
{
    protected $productFrontendService;

    public function __construct(ProductFrontendService $productFrontendService)
    {
        $this->productFrontendService = $productFrontendService;
    }

    /**
     * Return latest active products (for frontend).
     */
    public function latestProducts()
    {
        try {
            $products = $this->productFrontendService->getLatestProducts();

            return ApiResponseService::successResponse(
                $products,
                'Latest products fetched successfully'
            );
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }


    public function featuredProducts()
    {
        try {
            $products = $this->productFrontendService->getFeaturedProducts();

            return ApiResponseService::successResponse(
                $products,
                'Featured products fetched successfully'
            );
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }
}
