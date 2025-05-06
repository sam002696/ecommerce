<?php

namespace App\Services;

use App\Models\ShippingCharge;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ShippingChargeService
{
    /**
     * Fetch the current shipping charge.
     */
    public function getShippingCharge()
    {
        return ShippingCharge::first();
    }

    /**
     * Validate and update the shipping charge.
     */
    public function updateShippingCharge($request)
    {
        $validated = Validator::make($request->all(), [
            'shipping_charge' => 'required|numeric|min:0',
        ])->validate();

        $shipping = ShippingCharge::first();

        if (!$shipping) {
            $shipping = new ShippingCharge();
        }

        $shipping->shipping_charge = $validated['shipping_charge'];
        $shipping->save();

        return $shipping;
    }
}
