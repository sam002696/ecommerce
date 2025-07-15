<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    // public function product()
    // {
    //     return $this->belongsTo(Product::class);
    // }

    protected $fillable = [
        'order_id',
        'product_id',
        'qty',
        'price',
        'size',
        'name',
        'unit_price'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
