<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redis;

// use Illuminate\Support\Facades\Cache;

Route::get('/', function () {
    return view('welcome');
});


// Route::get('/redis-test', function () {
//     Redis::set('test_key', 'Hello Redis!');
//     $value = Redis::get('test_key');

//     return response()->json([
//         'message' => 'Redis is working!',
//         'value' => $value,
//     ]);
// });