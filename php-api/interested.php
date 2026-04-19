<?php
require_once __DIR__ . "/config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  respond(["status" => "error", "message" => "Method not allowed"], 405);
}

$input = get_request_data();
$email = trim($input["email"] ?? "");

if ($email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  respond(["status" => "error", "message" => "Valid email is required"], 400);
}

$conn = db_connect();
$sql = "INSERT INTO interested_users (email) VALUES (?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);

if (!$stmt->execute()) {
  respond(["status" => "error", "message" => "Could not save interest"], 500);
}

respond(["status" => "saved"]);
