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
            	//console.log(data);
                timeline_data = data.processes;
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

    dataTable.addColumn({ type: 'string', id: 'Processo' });
    dataTable.addColumn({ type: 'string', id: 'Referente,Compito' });
    dataTable.addColumn({ type: 'date', id: 'Inizio' });
    dataTable.addColumn({ type: 'date', id: 'Fine' });

    timeline = [];
    $(timeline_data).each( function(index) {
        current_process = timeline_data[index];
        row = [current_process.processo,
                current_process.referente + ": "+current_process.compito,
                new Date(current_process.data_inizio.substring(6,10),current_process.data_inizio.substring(3,5),current_process.data_inizio.substring(0,2)),
                new Date(current_process.data_fine.substring(6,10),current_process.data_fine.substring(3,5),current_process.data_fine.substring(0,2))];
        timeline.push(row);
    });

    console.log(timeline);
    dataTable.addRows(timeline);
    chart.draw(dataTable);
}