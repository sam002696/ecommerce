<?php

use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\admin\SizeController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\front\OrderController;
use App\Http\Controllers\front\ProductController as FrontProductController;
use Illuminate\Support\Facades\Route;

// public routes (no authentication required)
Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('login', [AuthController::class, 'login'])->name('login');

// routes open for all users
Route::get('products/latest', [FrontProductController::class, 'latestProducts']);
Route::get('products/featured', [FrontProductController::class, 'featuredProducts']);
Route::get('products-categories', [FrontProductController::class, 'getCategories']);
Route::get('products-brands', [FrontProductController::class, 'getBrands']);
Route::get('all-products', [FrontProductController::class, 'allProducts']);
Route::get('product-details/{id}', [FrontProductController::class, 'singleProduct']);


// protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'user']);


    // Admin-only routes with /admin prefix
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::apiResource('categories', CategoryController::class);
        Route::apiResource('brands', BrandController::class);
        Route::get('sizes', [SizeController::class, 'index']);


        Route::apiResource('products', ProductController::class);
        Route::post('save-product-image', [ProductController::class, 'saveProductImage']);
        Route::post('change-product-default-image', [ProductController::class, 'updateDefaultImage']);
        Route::delete('delete-product-image/{id}', [ProductController::class, 'deleteProductImage']);



        Route::post('upload-temp-image', [TempImageController::class, 'store']);
    });

    // Customer-only routes
    Route::middleware('role:customer')->group(function () {
        Route::post('save-order', [OrderController::class, 'saveOrder']);
        Route::get('get-order-details/{id}', [OrderController::class, 'getOrderDetails']);
    });
});
