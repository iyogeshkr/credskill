<?php
require_once __DIR__ . "/config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  respond(["status" => "error", "message" => "Method not allowed"], 405);
}

$input = get_request_data();
$email = trim($input["email"] ?? "");
$password = (string) ($input["password"] ?? "");

if ($email === "" || $password === "") {
  respond(["status" => "error", "message" => "email and password are required"], 400);
}

$conn = db_connect();

$sql = "SELECT id, name, email, password, role FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
  if (password_verify($password, $user["password"])) {
    respond([
      "status" => "success",
      "user_id" => (int) $user["id"],
      "name" => $user["name"],
      "email" => $user["email"],
      "role" => $user["role"]
    ]);
  }
  respond(["status" => "wrong_password"], 401);
}

respond(["status" => "no_user"], 404);
