<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
  exit;
}

function respond(array $payload, int $status = 200): void {
  http_response_code($status);
  echo json_encode($payload);
  exit;
}

function get_request_data(): array {
  if (!empty($_POST)) {
    return $_POST;
  }

  $raw = file_get_contents("php://input");
  if (!$raw) {
    return [];
  }

  $json = json_decode($raw, true);
  return is_array($json) ? $json : [];
}

function db_connect(): mysqli {
  $host = getenv("DB_HOST") ?: "localhost";
  $user = getenv("DB_USER") ?: "DB_USER";
  $pass = getenv("DB_PASS") ?: "DB_PASS";
  $name = getenv("DB_NAME") ?: "DB_NAME";

  $conn = new mysqli($host, $user, $pass, $name);
  if ($conn->connect_error) {
    respond(["status" => "error", "message" => "Database connection failed"], 500);
  }

  $conn->set_charset("utf8mb4");
  return $conn;
}
