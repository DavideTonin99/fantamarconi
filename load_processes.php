<?php
	header('Content-Type: application/json');

	include('conf/conf.php');

	$conn = @new mysqli(HOST, DB_USER, DB_PASSWORD, DB_NAME);
	// check the db connection
	if ($conn->connect_error) {
	    $data["error"] = "Database connection error";
	    die(json_encode($data));
	}

	$data = array();

	// data loading

	$conn->close();
	die(json_decode($data));
?>