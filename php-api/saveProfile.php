<?php
require_once __DIR__ . "/config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  respond(["status" => "error", "message" => "Method not allowed"], 405);
}

$input = get_request_data();
$user_id = (int) ($input["user_id"] ?? 0);
$education = trim($input["education"] ?? "");
$skills = trim($input["skills"] ?? "");
$experience = (int) ($input["experience"] ?? 0);
$portfolio = trim($input["portfolio"] ?? "");

if ($user_id <= 0 || $education === "" || $skills === "") {
  respond(["status" => "error", "message" => "user_id, education and skills are required"], 400);
}

$skillItems = array_filter(array_map("trim", explode(",", $skills)), fn($s) => $s !== "");
$skills_count = count($skillItems);
$score = ($skills_count * 10) + ($experience * 15);

$conn = db_connect();

$sql = "INSERT INTO profiles (user_id, education, skills, experience, portfolio, score)
VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issisi", $user_id, $education, $skills, $experience, $portfolio, $score);

if (!$stmt->execute()) {
  respond(["status" => "error", "message" => "Could not save profile"], 500);
}

respond(["status" => "success", "score" => $score]);
