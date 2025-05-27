<h2>New Order Placed</h2>

<p><strong>Name:</strong> {{ $order->name }}</p>
<p><strong>Email:</strong> {{ $order->email }}</p>
<p><strong>Total:</strong> {{ $order->grand_total }}</p>

<ul>
    @foreach ($order->items as $item)
        <li>{{ $item->name }} ({{ $item->qty }}) - {{ $item->price }}</li>
    @endforeach
</ul>