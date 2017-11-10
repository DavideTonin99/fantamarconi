<?php
	header('Content-Type: application/json');

	include('conf/conf.php');

	$data = array();

	$conn = @new mysqli(HOST, DB_USER, DB_PASSWORD, DB_NAME);
	// check the db connection
	if ($conn->connect_error) {
	    $data["error"] = "Database connection error";
	    die(json_encode($data));
	}

	$table = 'organogram';
	
	// data loading
	$table = 'organogram';
    $query = "SELECT * FROM $table;";

    $result = $conn->query($query);
    if ($result->num_rows > 0) {
        $data["organogram"] = array();
        while($row = $result->fetch_assoc()) {
            $data["organogram"][$row['id']] = array();
            foreach ($row as $key => $value) {
            	$data["organogram"][$row['id']][$key] = utf8_encode($value);
            }
        }
    } else {
        die(json_encode(array("noresult"=>"0 Persone trovate")));
    }

	$conn->close();
	die(json_encode($data));
?>