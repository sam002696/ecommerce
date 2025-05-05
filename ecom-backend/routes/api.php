<?php

use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\admin\SizeController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// public routes (no authentication required)
Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('login', [AuthController::class, 'login'])->name('login');

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
    Route::middleware('role:customer')->group(function () {});
});
