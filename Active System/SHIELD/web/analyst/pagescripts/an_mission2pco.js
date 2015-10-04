var infrJSON;
var scndJSON;
var cartList = [];
var selectedID;
var selectedText;

function initialize() {
    buildNav(msonStatus, 2);
    $.ajax({
        type: "GET",
        url: "GetExcerptOfMission",
        data: {
            missionID: missionID,
        },
        success: function (responseJSON) {
            cartJSON = responseJSON;
            loadSummary();
        }
    });
}

$(document).ready(function () {
    var table = $('#result-table').DataTable({
        "info": false,
        "filter": false,
        "bInfo": false,
        "bLengthChange": false,
        "ajax": {
            "url": "PrimaryExcerptSearch",
            "dataSrc": ""
        },
        "columns": [
            {"data": "text"},
            {"data": null,
                "defaultContent": "<button type='button' class='btn btn-success' style='margin:auto;'><span class='glyphicon glyphicon-plus'></span>Add</button>",
                className: "center", "bSortable": false, "bSearchable": false}
        ]
    });
    $('#result-table tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        viewExcerpt(data);
    });
});

function viewExcerpt(data) {
    document.getElementById("viewID").innerHTML = data.id;
    document.getElementById("viewText").innerHTML = data.text;
    document.getElementById("viewCategory").innerHTML = data.category;
    document.getElementById("viewSource").innerHTML = data.source;
    var viewTags = $('#viewTags');
    viewTags.tagsinput('removeAll');
    for (var x = 0; x < data.tags.length; x++) {
        viewTags.tagsinput('add', data.tags[x]);
    }
    
    var relatedTable = $('#related-table').DataTable({
        "info": false,
        "filter": false,
        "bInfo": false,
        "bLengthChange": false,
        "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        "ajax": {
            "url": "SecondaryExcerptSearch",
            "dataSrc": ""
        },
        "columns": [
            {"data": "text"},
            {"data": null,
                "defaultContent": "<button type='button' class='btn btn-success' style='margin:auto;'><span class='glyphicon glyphicon-plus'></span>Add</button>",
                className: "center", "bSortable": false, "bSearchable": false}
        ]
    });
    $('#related-table tbody').on('click', 'tr', function () {
        var data = relatedTable.row(this).data();
        viewExcerpt(data);
    });
    $('#viewExcerpt').modal('show');
}

$(document).ready(function () {
    $("#search-field").keydown(function () {

        if (event.keyCode == 13) {
            var table = document.getElementById('result-table');
            table.innerHTML = "<tr><td><img src='images/loading.gif' width='60' height='60'></img></td></tr>";
            $.ajax({
                type: "GET",
                url: "PrimaryExcerptSearch",
                data: {
                    param: $("#search-field").val()
                },
                success: function (responseJson) {
                    infrJSON = responseJson;
                    if (infrJSON.length > 0)
                        loadResult();
                    else
                        table.innerHTML = "<tr><td>No Results Found</td></tr>";
                }
            });
        }

    });
});

function loadSummary() {
    $.ajax({
        type: "GET",
        url: "GetExcerptOfMission",
        data: {
            missionID: missionID
        },
        success: function (responseJSON) {
            var political = 0, militarySecurity = 0, economic = 0, social = 0, information = 0, infrastructureTechnology = 0, environmentPhysical = 0;
            for (var x = 0; x < responseJSON.length; x++) {
                if (responseJSON[x].category === "political")
                    political += 1;
                else if (responseJSON[x].category === "military/security")
                    militarySecurity++;
                else if (responseJSON[x].category === "economic")
                    economic++;
                else if (responseJSON[x].category === "social")
                    social += 1;
                else if (responseJSON[x].category === "information")
                    information++;
                else if (responseJSON[x].category === "infrastructure and Technology")
                    infrastructureTechnology++;
                else if (responseJSON[x].category === "environment/phyiscal")
                    environmentPhysical++;
            }
            document.getElementById("political").innerHTML = political;
            document.getElementById("military-security").innerHTML = militarySecurity;
            document.getElementById("economic").innerHTML = economic;
            document.getElementById("social").innerHTML = social;
            document.getElementById("information").innerHTML = information;
            document.getElementById("infrastructure-technology").innerHTML = infrastructureTechnology;
            document.getElementById("environment-physical").innerHTML = environmentPhysical;
        }
    });
}


function savePCO() {
    $.ajax({
        type: "GET",
        url: "Save2PCO",
        success: function (response) {
            showAndDismissAlert("success", "<strong>Characteristics Overlay</strong> has been <strong>saved.</strong>");
            setTimeout(function () {
                window.location.assign("ANMission3COG?id=" + missionID)
            }, 3000);
        }
    });
}

