<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ApiResponseService;
use App\Services\OrderService;
use Illuminate\Validation\ValidationException;
use Exception;

class OrderController extends Controller
{
    protected $orderAdminService;

    public function __construct(OrderService $orderAdminService)
    {
        $this->orderAdminService = $orderAdminService;
    }

    /**
     * List all orders (with optional filters).
     */
    public function index(Request $request)
    {
        try {
            $orders = $this->orderAdminService->getAllOrders($request);

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

    /**
     * Show a single order with items.
     */
    public function show($id)
    {
        try {
            $order = $this->orderAdminService->getOrderById($id);

            if (!$order) {
                return ApiResponseService::errorResponse('Order not found', 404);
            }

            return ApiResponseService::successResponse(
                $order,
                'Order retrieved successfully'
            );
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }

    /**
     * Update order status/payment status.
     */
    public function update(Request $request, $id)
    {
        try {
            $order = $this->orderAdminService->updateOrder($request, $id);

            if (!$order) {
                return ApiResponseService::errorResponse('Order not found or update failed', 404);
            }

            return ApiResponseService::successResponse(
                $order,
                'Order updated successfully'
            );
        } catch (ValidationException $e) {
            return ApiResponseService::handleValidationError($e);
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }
}
