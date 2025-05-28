<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| 
*/

// Private channel for admin notifications
Broadcast::channel('admin.notifications', function ($user) {
    return $user->role === 'admin';
});
