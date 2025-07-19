<!DOCTYPE html>
<html>
<body>
    <h1>Order Confirmation</h1>
    <p>Dear {{ $customerName }},</p>
    <p>Thank you for your order (#{{ $order->id }}).</p>

    <h2>Order Details:</h2>
    <p>Total: ${{ number_format($order->total_amount, 2) }}</p>
</body>
</html>
