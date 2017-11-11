var timeline_data;

$(document).ready( function() {
	$.get("load_timeline.php",
        {
            dataType: "json"
        }
        ).done(function(data) {
            if (data.error !== undefined & data.error !== "") {
                alert('Error '+data.error);
            } else {
            	console.log(data);
                timeline_data = data;
                google.charts.load('current', {packages:["timeline"]});
                google.charts.setOnLoadCallback(draw_timeline);
            }
        })
        .fail(function() {
            alert("Failed");
	});
});

function draw_timeline() {
    console.log(timeline_data);
}