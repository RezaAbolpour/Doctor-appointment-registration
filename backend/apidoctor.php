<?php
header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
include 'connectDbHospital.php';

$allRecord=[];
if(!empty($_GET['target'])){
	if($_GET['target']=="getall"){
		$sql = "SELECT * FROM doctor";
		$result = $conn->query($sql);
		while($row = $result->fetch_assoc()) {
			$data = array(
				"id"=>$row['id'],
				"image"=>$row['image'],
				"name"=>$row['name'],
				"expertise"=>$row['expertise']
			);
			array_push($allRecord,$data);
		}
		$json_data = json_encode($allRecord);
		echo $json_data;
	}else if($_GET['target']=="search"){
		$typedoctor=$_GET['typedoctor'];
		$sql = "SELECT * FROM doctor WHERE expertise LIKE '%$typedoctor%'";
		$result = $conn->query($sql);
		while($row = $result->fetch_assoc()) {
			$data = array(
				"id"=>$row['id'],
				"image"=>$row['image'],
				"name"=>$row['name'],
				"expertise"=>$row['expertise']
			);
			array_push($allRecord,$data);
		}
		$json_data = json_encode($allRecord);
		echo $json_data;
	}
}
