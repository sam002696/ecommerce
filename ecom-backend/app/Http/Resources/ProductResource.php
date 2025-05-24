<?php

// app/Http/Resources/ProductResource.php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'price'       => $this->price,
            'status'      => $this->status,
            'image_url'   => $this->image_url,
            'sku'         => $this->sku,

        ];
    }
}
