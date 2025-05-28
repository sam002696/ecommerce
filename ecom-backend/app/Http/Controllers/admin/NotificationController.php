<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ApiResponseService;
use Illuminate\Validation\ValidationException;
use Exception;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        try {
            $notifications = $request->user()->notifications()->latest()->get();

            return ApiResponseService::successResponse(
                $notifications,
                'Notifications retrieved successfully'
            );
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }

    public function markAsRead($id, Request $request)
    {
        try {
            $notification = $request->user()->notifications()->findOrFail($id);
            $notification->markAsRead();

            return ApiResponseService::successResponse(
                $notification,
                'Notification marked as read'
            );
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }

    public function unreadCount(Request $request)
    {
        try {
            $count = $request->user()->unreadNotifications()->count();

            return ApiResponseService::successResponse(
                ['unread_count' => $count],
                'Unread count fetched'
            );
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }
}
