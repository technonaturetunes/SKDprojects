<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $item = strip_tags(trim($_POST['item']));
    $price = floatval($_POST['price']);
    $name = strip_tags(trim($_POST['customerName']));
    $phone = strip_tags(trim($_POST['customerPhone']));
    $address = strip_tags(trim($_POST['customerAddress']));

    if (!$item || !$price || !$name || !$phone || !$address) {
        http_response_code(400);
        echo "Please fill in all fields.";
        exit;
    }

    // Save order to file (for demo)
    $order = "Order Details:\n";
    $order .= "Item: $item\n";
    $order .= "Price: $price\n";
    $order .= "Name: $name\n";
    $order .= "Phone: $phone\n";
    $order .= "Address: $address\n";
    $order .= "----------\n";

    file_put_contents('orders.txt', $order, FILE_APPEND);

    echo "Thank you $name! Your order for $item has been received.";
} else {
    http_response_code(403);
    echo "Forbidden";
}
