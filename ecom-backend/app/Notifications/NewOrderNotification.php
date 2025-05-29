<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;
use App\Models\Order;

class NewOrderNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $order;

    /**
     * Create a new notification instance.
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }



    /**
     * Get the database representation of the notification.
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'order_id' => $this->order->id,
            'customer_name' => $this->order->name,
            'total' => $this->order->grand_total,
            'placed_at' => $this->order->created_at->format('d M Y, h:i A'),
            'message'       => "A new order has been placed by {$this->order->name} (Order ID: {$this->order->id}) for a total of BDT {$this->order->grand_total}.",
        ];
    }

    /**
     * Broadcast representation (for Laravel Echo).
     */
    // public function toBroadcast(object $notifiable): BroadcastMessage
    // {
    //     return new BroadcastMessage([
    //         'order_id' => $this->order->id,
    //         'customer_name' => $this->order->name,
    //         'total' => $this->order->grand_total,
    //         'placed_at' => $this->order->created_at->format('d M Y, h:i A'),
    //     ]);
    // }
}
