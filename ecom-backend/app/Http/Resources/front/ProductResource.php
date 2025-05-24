<?php

// app/Http/Resources/ProductResource.php

namespace App\Http\Resources\front;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'price'       => $this->price,
            'description' => $this->description,
            'image_url'   => $this->image_url,


        ];
    }
}
