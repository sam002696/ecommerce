<?php

use App\Http\Controllers\admin\CategoryController;
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
    });

    // Customer-only routes
    Route::middleware('role:customer')->group(function () {});
});
