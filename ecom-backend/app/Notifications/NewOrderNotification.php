<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
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
        return ['database', 'broadcast']; // Add 'mail' if you still want emails
    }

    /**
     * Get the mail representation of the notification.
     */
    // public function toMail(object $notifiable): MailMessage
    // {
    //     return (new MailMessage)
    //         ->subject('New Order Placed')
    //         ->line('A new order has been placed.')
    //         ->line("Order ID: {$this->order->id}")
    //         ->line("Customer: {$this->order->name}")
    //         ->line("Total: ₹{$this->order->grand_total}")
    //         ->action('View Order', url("/admin/orders/{$this->order->id}"))
    //         ->line('Thank you!');
    // }

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
        ];
    }

    /**
     * Broadcast representation (for Laravel Echo).
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'order_id' => $this->order->id,
            'customer_name' => $this->order->name,
            'total' => $this->order->grand_total,
            'placed_at' => $this->order->created_at->format('d M Y, h:i A'),
        ]);
    }
}
