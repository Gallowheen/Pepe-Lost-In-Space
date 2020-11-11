<?php

$host = "127.0.0.1";
$user = "root";
$mdp = "";
$base = "high_score";

$link = mysqli_connect($host,$user,$mdp,$base);
mysqli_query($link, "SET NAMES UTF8");

$sql = "SELECT * FROM high_score ORDER BY score DESC LIMIT 10";
$q = mysqli_query($link, $sql);
$rows = array();

while($e = $q->fetch_assoc() ){
    $rows['score'][] = $e;
}

echo json_encode($rows);
//return json_encode($rows);
?>