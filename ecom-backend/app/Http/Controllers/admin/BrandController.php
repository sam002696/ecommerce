<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\BrandService;
use App\Services\ApiResponseService;
use Illuminate\Validation\ValidationException;
use Exception;

class BrandController extends Controller
{
    protected $brandService;

    public function __construct(BrandService $brandService)
    {
        $this->brandService = $brandService;
    }

    public function index(Request $request)
    {
        $brandsData = $this->brandService->getAllBrands($request);

        return ApiResponseService::successResponse(
            $brandsData['brands'],
            'Brands retrieved successfully',
            200,
            $brandsData['pagination']
        );
    }

    public function store(Request $request)
    {
        try {
            $brand = $this->brandService->createBrand($request);

            return ApiResponseService::successResponse(
                $brand,
                'Brand created successfully',
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
        $brand = $this->brandService->getBrandById($id);

        if (!$brand) {
            return ApiResponseService::errorResponse('Brand not found', 404);
        }

        return ApiResponseService::successResponse(
            $brand,
            'Brand retrieved successfully'
        );
    }

    public function update(Request $request, $id)
    {
        try {
            $brand = $this->brandService->updateBrand($request, $id);

            if (!$brand) {
                return ApiResponseService::errorResponse('Brand not found', 404);
            }

            return ApiResponseService::successResponse(
                $brand,
                'Brand updated successfully'
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
            $deleted = $this->brandService->deleteBrand($id);

            if (!$deleted) {
                return ApiResponseService::errorResponse('Brand not found', 404);
            }

            return ApiResponseService::successResponse(
                null,
                'Brand deleted successfully'
            );
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }
}
