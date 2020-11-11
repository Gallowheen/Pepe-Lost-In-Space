<?php

$host = "127.0.0.1";
$user = "root";
$mdp = "";
$base = "high_score";

$link = mysqli_connect($host,$user,$mdp,$base);
mysqli_query($link, "SET NAMES UTF8");



print_r($_POST);
$score = $_POST['score'];
$pseudo = $_POST['pseudo'];
//die("lol");
echo $score;

$liste = $link->query("INSERT INTO `high_score` (`score`, `pseudo`, `date`) VALUES ('$score', '$pseudo', NOW())");

//return json_encode($rows);

?>