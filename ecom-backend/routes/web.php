<?php

use Illuminate\Support\Facades\Route;

// use Illuminate\Support\Facades\Cache;

Route::get('/', function () {
    return view('welcome');
});


// Route::get('/redis-test', function () {
//     Cache::put('redis_key', 'Redis is working ffff! 🎉', 60);
//     return Cache::get('redis_key');
// });
