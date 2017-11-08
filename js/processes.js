$(document).ready( function() {
	$.get("load_processes.php",
        {
            dataType: "json"
        }
        ).done(function(data) {
            if (data.error !== undefined & data.error !== "") {
                alert('Error '+data.error);
            } else {
            	console.log(data);
            }
        })
        .fail(function() {
            console.log('failed');
	   });
});