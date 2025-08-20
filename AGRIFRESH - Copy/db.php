<?php
$host = "localhost"; 
$user = "root"; // your phpMyAdmin username
$pass = "";     // your phpMyAdmin password
$dbname = "agri_fresh";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
