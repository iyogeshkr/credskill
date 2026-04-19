<?php
require_once __DIR__ . "/config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  respond(["status" => "error", "message" => "Method not allowed"], 405);
}

$input = get_request_data();
$name = trim($input["name"] ?? "");
$email = trim($input["email"] ?? "");
$passwordRaw = (string) ($input["password"] ?? "");
$role = trim($input["role"] ?? "student");

if ($name === "" || $email === "" || $passwordRaw === "") {
  respond(["status" => "error", "message" => "name, email and password are required"], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  respond(["status" => "error", "message" => "Invalid email"], 400);
}

if (!in_array($role, ["student", "employer"], true)) {
  respond(["status" => "error", "message" => "Invalid role"], 400);
}

$conn = db_connect();
$password = password_hash($passwordRaw, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $email, $password, $role);

if ($stmt->execute()) {
  respond([
    "status" => "success",
    "user_id" => $stmt->insert_id,
    "name" => $name,
    "email" => $email,
    "role" => $role
  ]);
}

if ($conn->errno === 1062) {
  respond(["status" => "error", "message" => "Email already exists"], 409);
}

respond(["status" => "error", "message" => "Signup failed"], 500);
