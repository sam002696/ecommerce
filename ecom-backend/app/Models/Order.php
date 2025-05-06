<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $fillable = [
        'status',
        'payment_status'
    ];
    public function order_items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
