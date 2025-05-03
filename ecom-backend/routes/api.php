<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// public routes (no authentication required)
Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('login', [AuthController::class, 'login'])->name('login');

// protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'user']);
});
