<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ShippingCharge;
use App\Services\ApiResponseService;
use Illuminate\Validation\ValidationException;
use Exception;

class ShippingController extends Controller
{
    /**
     * Get the current shipping charge.
     */
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

    /**
     * Update the shipping charge.
     */
    public function updateShipping(Request $request)
    {
        try {
            $validated = $request->validate([
                'shipping_charge' => 'required|numeric|min:0',
            ]);

            $shipping = ShippingCharge::first();
            if (!$shipping) {
                $shipping = new ShippingCharge();
            }

            $shipping->shipping_charge = $validated['shipping_charge'];
            $shipping->save();

            return ApiResponseService::successResponse(
                $shipping,
                'Shipping charge updated successfully'
            );
        } catch (ValidationException $e) {
            return ApiResponseService::handleValidationError($e);
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }
}
