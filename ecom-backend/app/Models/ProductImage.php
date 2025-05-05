<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Str;

class ProductImage extends Model
{

    protected $appends = ['image_url'];

    // Hiding the actual 'image' column from API output
    protected $hidden = ['image'];


    public function getImageUrlAttribute()
    {
        if (empty($this->image)) {
            return '';
        }

        //  If image already contains a full URL (starts with http/https), return as-is
        if (Str::startsWith($this->image, ['http://', 'https://'])) {
            return $this->image;
        }

        // Otherwise, treat as local image filename
        return asset('uploads/products/small/' . $this->image);
    }
}
