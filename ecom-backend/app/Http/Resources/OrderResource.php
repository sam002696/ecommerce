<?php

// app/Http/Resources/OrderResource.php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'status'        => $this->status,
            'payment_status' => $this->payment_status,
            // 'subtotal'      => $this->subtotal,
            'grand_total'   => $this->grand_total,
            // 'shipping'      => $this->shipping,
            // 'created_at'    => $this->created_at,
            // 'order_items'   => OrderItemResource::collection($this->whenLoaded('order_items')),
        ];
    }
}
