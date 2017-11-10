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
                //console.log(data);
                process_data(data);
            }
        })
        .fail(function() {
            console.log('failed');
	   });
});

function process_data(data) {
    if ($('#table-container').length > 0) {
        $('#table-container').remove();
    }

    if (data.noresult !== undefined) {
        $('#content').append("<div class='row'>"+data.noresult+"</div>");
        return;
    }

    $('#content').append("<div class='row' id='table-container'><table id='result-table' class='table table-striped table-bordered'></table></div>");

    thead_columns = "";
    $(Object.keys(data.processes[0])).each( function(index,key) {
        thead_columns += '<th>'+key.toUpperCase()+'</th>';
    });

    $('#result-table').append('<tr>'+thead_columns+'</tr>');

    $(data.processes).each( function(index) {
        process_values = Object.values(data.processes[index.toString()]);
        row = '<td>'+process_values[0]+'</td>';
        row += '<td>'+process_values[1]+'</td>';
        row += '<td>'+process_values[2]+'</td>';
        row += '<td>'+process_values[3]+'</td>';
        row += '<td>'+process_values[4]+'</td>';
        $('#result-table').append('<tr>'+row+'</tr>');
    });
}