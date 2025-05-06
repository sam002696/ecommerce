<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\front\OrderService;
use App\Services\ApiResponseService;
use Illuminate\Validation\ValidationException;
use Exception;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function saveOrder(Request $request)
    {
        try {
            $order = $this->orderService->storeOrder($request);

            return ApiResponseService::successResponse(
                $order,
                'You have successfully placed your order'
            );
        } catch (ValidationException $e) {
            return ApiResponseService::handleValidationError($e);
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }

    public function getOrderDetails($id, Request $request)
    {
        try {
            $order = $this->orderService->fetchOrderDetails($id, $request->user()->id);

            if (!$order) {
                return ApiResponseService::errorResponse('Order not found.', 404);
            }

            return ApiResponseService::successResponse(
                $order,
                'Order fetched successfully'
            );
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }

    public function getAllOrders(Request $request)
    {
        try {
            $orders = $this->orderService->fetchAllOrders($request);

            return ApiResponseService::successResponse(
                $orders['orders'],
                'Orders fetched successfully',
                200,
                $orders['pagination']
            );
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }
}
