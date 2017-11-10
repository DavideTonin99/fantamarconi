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
    keys = [];
    for (key in data.processes[0]) {
        thead_columns += '<th>'+key.toUpperCase()+'</th>';
        keys.push(key);
    }

    $('#result-table').append('<tr>'+thead_columns+'</tr>');

    $(data.processes).each( function(index) {
		process_values = data.processes[index.toString()];
        row = "";
        for (i=0;i<keys.length;i++) {
            row += '<td>'+process_values[keys[i]]+'</td>';
        }
        $('#result-table').append('<tr>'+row+'</tr>');
    });

	if ($('#json-export').length > 0) {
        $('#json-export').parent('div').remove();
    }

    current_date = new Date();
    current_table = $('#table-select').val();
    json_export_conf(JSON.stringify(data), current_table+"_"+current_date.getDay()+"_"+current_date.getMonth()+"_"+current_date.getFullYear()+'.json', 'text/plain');
}

function json_export_conf(text, name, type) {
    var file = new Blob([text], {type: type});
    $("<div class='row text-center'><a id='json-export' href='"+URL.createObjectURL(file)+"' target='_blank' download='"+name+"'>ESPORTA IN JSON</a></div>").insertAfter('#table-container');
}
