var organogram_data;

$(document).ready( function() {
	$.get("load_organogram.php",
        {
            dataType: "json"
        }
        ).done(function(data) {
            if (data.error !== undefined & data.error !== "") {
                alert('Error '+data.error);
            } else {
                //console.log(data);
                organogram_data = data;
                google.charts.load('current', {packages:["orgchart"]});
                google.charts.setOnLoadCallback(draw_organogram);
            }
        })
        .fail(function() {
            alert("Failed");
	});
});

function draw_organogram() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');

    // For each orgchart box, provide the name, manager, and tooltip to show.
    data.addRows([
      [{v:'Mike', f:'Mike<div style="color:red; font-style:italic">President</div>'},
       '', 'The President'],
      [{v:'Jim', f:'Jim<div style="color:red; font-style:italic">Vice President</div>'},
       'Mike', 'VP'],
      ['Alice', 'Mike', ''],
      ['Bob', 'Jim', 'Bob Sponge'],
      ['Carol', 'Bob', '']
    ]);

    // Create the chart.
    var chart = new google.visualization.OrgChart($('#content').get(0));
    // Draw the chart, setting the allowHtml option to true for the tooltips.
    chart.draw(data, {allowHtml:true});
}