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


    public function allProducts(Request $request)
    {
        try {
            $productsData = $this->productFrontendService->getAllProductsWithFilters($request);

            return ApiResponseService::successResponse(
                $productsData['products'],
                'Products retrieved successfully',
                200,
                $productsData['pagination']
            );
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
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



    public function getCategories()
    {
        try {
            $categories = $this->productFrontendService->getCategories();

            return ApiResponseService::successResponse(
                $categories,
                'Categories fetched successfully'
            );
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }

    public function getBrands()
    {
        try {
            $brands = $this->productFrontendService->getBrands();

            return ApiResponseService::successResponse(
                $brands,
                'Brands fetched successfully'
            );
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }
}
