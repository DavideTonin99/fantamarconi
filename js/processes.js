var global_data;

$(document).ready( function() {
	$.get("load_processes.php",
        {
            dataType: "json"
        }
        ).done(function(data) {
            if (data.error !== undefined & data.error !== "") {
                alert('Error '+data.error);
            } else {
                global_data = data;
                console.log(data);
                process_data(data);
            }
        })
        .fail(function() {
            console.log('failed');
	   });
});

function process_data(data) {
    var rows;

    $(data.processes).each( function(index) {
        process = data.processes[index.toString()];
        rows = [];
        rows[index.toString()] = {
                        'name':process.name,
                        'start_date':process.start_date,
                        'end_date':process.end_date,
                        'referent':data.persons[process.id_referent.toString()].name+' '+data.persons[process.id_referent.toString()].surname,
                        'email':data.persons[process.id_referent.toString()].email
                    };
    });

    if ($('#table-container').length > 0) {
        $('#table-container').remove();
    }

    if (data.noresult !== undefined) {
        $('#content').append("<div class='row'>"+data.noresult+"</div>");
        return;
    }

    $('#content').append("<div class='row' id='table-container'><table id='result-table' class='table table-striped table-bordered'></table></div>");

    thead_columns = "<th>NOME</th>";
    thead_columns += "<th>REFERENTE</th>";
    thead_columns += "<th>EMAIL</th>";
    thead_columns += "<th>DATA INIZIO</th>";
    thead_columns += "<th>DATA FINE</th>";

    $('#result-table').append('<tr>'+thead_columns+'</tr>');

    for (i=0;i<rows.length;i++) {
        row = '<td>'+rows[i]['name']+'</td>';
        row += '<td>'+rows[i]['referent']+'</td>';
        row += '<td>'+rows[i]['email']+'</td>';
        row += '<td>'+rows[i]['start_date']+'</td>';
        row += '<td>'+rows[i]['end_date']+'</td>';
        $('#result-table').append('<tr>'+row+'</tr>');
    }

    console.log(thead_columns);
}