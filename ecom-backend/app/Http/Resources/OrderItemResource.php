<?php

// app/Http/Resources/OrderItemResource.php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'size'       => $this->size,
            'qty'        => $this->qty,
            'price'      => $this->price,
            'unit_price' => $this->unit_price,
            'product'    => new ProductResource($this->whenLoaded('product')),
        ];
    }
}
