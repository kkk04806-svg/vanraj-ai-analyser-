<?php
header('Content-Type: application/json; charset=utf-8');

$url = $_GET['url'] ?? '';
if (!$url) {
  echo json_encode(['error' => 'Missing url']);
  exit;
}

$cookie = $_SERVER['HTTP_X_COOKIE'] ?? '';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Accept: application/json',
  'User-Agent: Mozilla/5.0'
]);

if ($cookie) {
  curl_setopt($ch, CURLOPT_COOKIE, $cookie);
}

$response = curl_exec($ch);

if (curl_errno($ch)) {
  echo json_encode(['error' => curl_error($ch)]);
  curl_close($ch);
  exit;
}

curl_close($ch);
echo $response;
?>
