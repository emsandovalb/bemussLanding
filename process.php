<?php
header('Content-Type: application/json; charset=utf-8');

$recipient = 'ventas@bemuss.com';
$subjectPrefix = '[Bemuss]';
$errors = array();
$data = array();

function request_value($primary, $fallback = null) {
    if (isset($_POST[$primary])) {
        return trim(stripslashes($_POST[$primary]));
    }

    if ($fallback !== null && isset($_POST[$fallback])) {
        return trim(stripslashes($_POST[$fallback]));
    }

    return '';
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array(
        'success' => false,
        'message' => 'Método no permitido.'
    ));
    exit;
}

$name = request_value('name', 'form-name');
$email = request_value('email', 'form-email');
$subject = request_value('subject', 'form-subject');
$message = request_value('message', 'form-message');

if ($name === '') {
    $errors['name'] = 'El nombre es requerido.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'El correo electrónico no es válido.';
}

if ($message === '') {
    $errors['message'] = 'El mensaje es requerido.';
}

if (!empty($errors)) {
    http_response_code(422);
    $data['success'] = false;
    $data['errors'] = $errors;
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($subject === '') {
    $subject = 'Nuevo mensaje desde Bemuss';
}

$subjectLine = $subjectPrefix . ' ' . $subject;
$body = '<strong>Nombre:</strong> ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '<br>';
$body .= '<strong>Correo:</strong> ' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '<br>';
$body .= '<strong>Tema:</strong> ' . htmlspecialchars($subject, ENT_QUOTES, 'UTF-8') . '<br><br>';
$body .= '<strong>Mensaje:</strong><br>' . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: Bemuss <" . $recipient . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

$sent = @mail($recipient, $subjectLine, $body, $headers);

if (!$sent) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'message' => 'No se pudo enviar el mensaje en este momento.'
    ), JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(array(
    'success' => true,
    'message' => 'Tu mensaje fue enviado correctamente. Te contactaremos pronto.'
), JSON_UNESCAPED_UNICODE);
