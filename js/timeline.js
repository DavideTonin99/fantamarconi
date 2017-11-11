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
    var container = document.getElementById('content');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();

    dataTable.addColumn({ type: 'string', id: 'President' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
      [ 'Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
      [ 'Adams',      new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
      [ 'Jefferson',  new Date(1801, 2, 4),  new Date(1809, 2, 4) ]]);

    chart.draw(dataTable);

}