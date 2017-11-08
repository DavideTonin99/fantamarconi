$(document).ready( function() {
	$.get("load_organogram.php",
        {
            dataType: "json"
        }
        ).done(function(data) {
            if (data.error !== undefined & data.error !== "") {
                alert('Error '+data.error);
            } else {
            	// fai qui quello che devi fare bomber
            }
        })
        .fail(function() {
            alert("Failed");
	});
});