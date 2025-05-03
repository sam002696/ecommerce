<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\CategoryService;
use App\Services\ApiResponseService;
use Illuminate\Validation\ValidationException;
use Exception;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index(Request $request)
    {
        $categoriesData = $this->categoryService->getAllCategories($request);

        return ApiResponseService::successResponse(
            $categoriesData['categories'],
            'Categories retrieved successfully',
            200,
            $categoriesData['pagination']
        );
    }

    public function store(Request $request)
    {
        try {
            $category = $this->categoryService->createCategory($request);

            return ApiResponseService::successResponse(
                $category,
                'Category created successfully',
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
        $category = $this->categoryService->getCategoryById($id);

        if (!$category) {
            return ApiResponseService::errorResponse('Category not found', 404);
        }

        return ApiResponseService::successResponse(
            $category,
            'Category retrieved successfully'
        );
    }

    public function update(Request $request, $id)
    {
        try {
            $category = $this->categoryService->updateCategory($request, $id);

            if (!$category) {
                return ApiResponseService::errorResponse('Category not found', 404);
            }

            return ApiResponseService::successResponse(
                $category,
                'Category updated successfully'
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
            $deleted = $this->categoryService->deleteCategory($id);

            if (!$deleted) {
                return ApiResponseService::errorResponse('Category not found', 404);
            }

            return ApiResponseService::successResponse(
                null,
                'Category deleted successfully'
            );
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }
}
