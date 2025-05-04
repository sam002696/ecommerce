<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Support\Str;


class Product extends Model
{

    protected $appends = ['image_url'];

    // ✅ Hide the actual 'image' column from API output
    protected $hidden = ['image'];


    use HasFactory;
    protected $fillable = [
        'title',
        'price',
        'compare_price',
        'description',
        'short_description',
        'image',
        'category_id',
        'brand_id',
        'qty',
        'sku',
        'barcode',
        'status',
        'is_featured',
    ];

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
