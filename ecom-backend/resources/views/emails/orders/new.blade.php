<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #f6f6f6;
            padding: 20px;
            color: #333;
        }

        .email-container {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            max-width: 600px;
            margin: auto;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .order-summary {
            margin-top: 20px;
            padding: 10px 0;
            border-top: 1px solid #eaeaea;
        }

        .order-item {
            padding: 5px 0;
            border-bottom: 1px solid #eee;
        }

        h2 {
            color: #1a73e8;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <h2>🛒 New Order Placed</h2>

        <p><strong>Name:</strong> {{ $order->name }}</p>
        <p><strong>Email:</strong> {{ $order->email }}</p>
        <p><strong>Total:</strong> ${{ number_format($order->grand_total, 2) }}</p>

        <div class="order-summary">
            <h4>Order Items:</h4>
            @foreach ($order->order_items as $item)
                <div class="order-item">
                    <strong>{{ $item->name }}</strong> ({{ $item->qty }}) - ${{ number_format($item->price, 2) }}
                </div>
            @endforeach
        </div>
    </div>
</body>

</html>