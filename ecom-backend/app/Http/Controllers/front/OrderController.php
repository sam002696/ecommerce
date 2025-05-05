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
}
