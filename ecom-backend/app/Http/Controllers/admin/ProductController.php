<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ProductService;
use App\Services\ApiResponseService;
use Illuminate\Validation\ValidationException;
use Exception;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request)
    {
        $productsData = $this->productService->getAllProducts($request);

        return ApiResponseService::successResponse(
            $productsData['products'],
            'Products retrieved successfully',
            200,
            $productsData['pagination']
        );
    }

    public function store(Request $request)
    {
        try {
            $product = $this->productService->createProduct($request);

            return ApiResponseService::successResponse(
                $product,
                'Product created successfully',
                201
            );
        } catch (ValidationException $e) {
            return ApiResponseService::handleValidationError($e);
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }

    public function show($id)
    {
        $product = $this->productService->getProductById($id);

        if (!$product) {
            return ApiResponseService::errorResponse('Product not found', 404);
        }

        return ApiResponseService::successResponse(
            $product,
            'Product retrieved successfully'
        );
    }

    public function update(Request $request, $id)
    {
        try {
            $product = $this->productService->updateProduct($request, $id);

            if (!$product) {
                return ApiResponseService::errorResponse('Product not found', 404);
            }

            return ApiResponseService::successResponse(
                $product,
                'Product updated successfully'
            );
        } catch (ValidationException $e) {
            return ApiResponseService::handleValidationError($e);
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $deleted = $this->productService->deleteProduct($id);

            if (!$deleted) {
                return ApiResponseService::errorResponse('Product not found', 404);
            }

            return ApiResponseService::successResponse(
                null,
                'Product deleted successfully'
            );
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }


    public function saveProductImage(Request $request)
    {
        try {
            $product = $this->productService->saveProductImage($request);

            if (!$product) {
                return ApiResponseService::errorResponse('Product not found', 404);
            }

            return ApiResponseService::successResponse(
                $product,
                'Product image saved successfully'
            );
        } catch (ValidationException $e) {
            return ApiResponseService::handleValidationError($e);
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }


    public function updateDefaultImage(Request $request)
    {
        try {
            $product = $this->productService->updateDefaultImage($request);

            if (!$product) {
                return ApiResponseService::errorResponse('Product not found', 404);
            }

            return ApiResponseService::successResponse(
                $product,
                'Product default image changed successfully'
            );
        } catch (ValidationException $e) {
            return ApiResponseService::handleValidationError($e);
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }


    public function deleteProductImage($id)
    {
        try {
            $deleted = $this->productService->deleteProductImage($id);

            if (!$deleted) {
                return ApiResponseService::errorResponse('Product image not found', 404);
            }

            return ApiResponseService::successResponse(
                null,
                'Product image deleted successfully'
            );
        } catch (ValidationException $e) {
            return ApiResponseService::handleValidationError($e);
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }
}
