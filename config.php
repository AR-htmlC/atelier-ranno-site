<?php
$host = '185.207.226.14';
$dbname = 'jrpzfd_atelierr_db';
$username = 'jrpzfd_atelierr_db';
$password = '_*ie%p!0LW2U19tQ';

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
} catch (PDOException $e) {
  die("Connexion échouée : " . $e->getMessage());
}
?>