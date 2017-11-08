<?php
	header('Content-Type: application/json');

	include('conf/conf.php');

	$conn = @new mysqli(HOST, DB_USER, DB_PASSWORD, DB_NAME);
	// check the db connection
	if ($conn->connect_error) {
	    $data["error"] = "Database connection error";
	    die(json_encode($data));
	}

	$table_processes = 'processes';
	$table_persons = 'people_processes';

    // load persons
    $query = "SELECT * FROM $table_persons;";

    $result = $conn->query($query);
    if ($result->num_rows > 0) {
        $data["persons"] = array();
        while($row = $result->fetch_assoc()) {
            $data["persons"][$row['id']] = array();
            foreach ($row as $key => $value) {
            	$data["persons"][$row['id']][$key] = utf8_encode($value);
            }
        }
    } else {
        die(json_encode(array("noresult"=>"0 RESULTS")));
    }

	$conn->close();
	die(json_encode($data));
?>