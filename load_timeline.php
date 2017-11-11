<?php
	header('Content-Type: application/json');

	include('conf/conf.php');

	$conn = @new mysqli(HOST, DB_USER, DB_PASSWORD, DB_NAME);
	// check the db connection
	if ($conn->connect_error) {
	    $data["error"] = "Database connection error";
	    die(json_encode($data));
	}

    $person = "";
    if (isset($_GET['person'])) {
        $person = $_GET['person'];
    }
	$table_timeline = 'timeline';
    $table_persons = 'people_processes';

    if ($person == "") {
        $query = "SELECT process AS processo,CONCAT($table_persons.surname,' ',$table_persons.name) AS referente,job AS compito,DATE_FORMAT(start_date,'%d-%m-%Y') AS data_inizio,DATE_FORMAT(end_date,'%d-%m-%Y') AS data_fine FROM $table_timeline,$table_persons WHERE $table_timeline.id_referent=$table_persons.id";
    } else {
        $query = "SELECT process AS processo,CONCAT($table_persons.surname,' ',$table_persons.name) AS referente,job AS compito,DATE_FORMAT(start_date,'%d-%m-%Y') AS data_inizio,DATE_FORMAT(end_date,'%d-%m-%Y') AS data_fine FROM $table_timeline,$table_persons WHERE $table_timeline.id_referent=$person AND $table_timeline.id_referent=$table_persons.id";
    } 
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
        die(json_encode(array("noresult"=>"0 Processi trovati")));
    }

	$conn->close();
	die(json_encode($data));
?>