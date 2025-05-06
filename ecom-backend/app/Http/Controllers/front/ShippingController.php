<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\ShippingCharge;
use App\Services\ApiResponseService;
use Exception;
use Illuminate\Http\Request;




class ShippingController extends Controller
{
    public function getShipping()
    {
        try {
            $shipping = ShippingCharge::first();

            return ApiResponseService::successResponse(
                $shipping,
                'Shipping charge retrieved successfully'
            );
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }
}
