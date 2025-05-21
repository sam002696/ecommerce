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

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime:d M, Y',
        ];
    }
}
