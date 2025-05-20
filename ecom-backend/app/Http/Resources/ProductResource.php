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
            'image_url'   => $this->image_url,
            'description' => $this->description,
            // Add only what you want to expose publicly
        ];
    }
}
