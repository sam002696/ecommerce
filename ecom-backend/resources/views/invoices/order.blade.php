<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            color: #333;
        }

        .invoice-box {
            padding: 20px;
            border: 1px solid #eee;
            width: 100%;
        }

        h2 {
            margin-bottom: 10px;
        }

        table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 8px;
            border: 1px solid #ddd;
            text-align: left;
        }
    </style>
</head>

<body>
    <div class="invoice-box">
        <h2>Invoice #{{ $order->id }}</h2>
        <p><strong>Date:</strong> {{ $order->created_at->format('d M Y') }}</p>
        <p><strong>Customer:</strong> {{ $order->name }}</p>
        <p><strong>Email:</strong> {{ $order->email }}</p>

        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($order->order_items as $item)
                    <tr>
                        <td>{{ $item->name }}</td>
                        <td>{{ $item->qty }}</td>
                        <td>৳{{ number_format($item->price, 2) }}</td>
                    </tr>
                @endforeach
                <tr>
                    <td colspan="2"><strong>Total</strong></td>
                    <td><strong>৳{{ number_format($order->grand_total, 2) }}</strong></td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>