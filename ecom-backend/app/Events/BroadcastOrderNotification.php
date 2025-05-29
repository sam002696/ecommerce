<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BroadcastOrderNotification implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('admin.notifications');
    }


    public function broadcastAs()
    {
        return 'new-order';
    }


    public function broadcastWith(): array
    {
        return [
            'data' => [
                'order_id'      => $this->order->id,
                'customer_name' => $this->order->name,
                'total'         => $this->order->grand_total,
                'placed_at'     => $this->order->created_at->format('d M Y, h:i A'),
            ],
        ];
    }
}
