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

    $query = "SELECT ".$table_processes.".name AS nome_processo, CONCAT(".$table_persons.".name,' ',surname) AS referente,email,DATE_FORMAT(start_date,'%d-%m-%Y') AS data_inizio,DATE_FORMAT(end_date,'%d-%m-%Y') AS data_fine FROM processes,people_processes WHERE id=id_referent;";
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
        $data["processes"] = array();
        $cont = 0;
        while($row = $result->fetch_assoc()) {
            $data["processes"][$cont] = array();
            foreach ($row as $key => $value) {
                $data["processes"][$cont][$key] = utf8_encode($value);
            }
            $cont++;
        }
    } else {
        die(json_encode(array("noresult"=>"0 Persone trovate")));
    }

	$conn->close();
	die(json_encode($data));
?>