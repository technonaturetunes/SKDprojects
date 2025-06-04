<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = strip_tags(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($_POST['message']));

    if (!$name || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$message) {
        http_response_code(400);
        echo "Please fill in all fields correctly.";
        exit;
    }

    // For demo: just save to a file
    $entry = "Name: $name\nEmail: $email\nMessage: $message\n-----\n";
    file_put_contents('messages.txt', $entry, FILE_APPEND);

    echo "Thank you for contacting us, $name! We will get back to you shortly.";
} else {
    http_response_code(403);
    echo "Forbidden";
}
