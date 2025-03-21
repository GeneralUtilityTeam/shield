//var srcJSON = [{"datePublish": "2010-01-01", "type": "Area Study", "name": "Davao del Sur Area Study 2010", "description": "Area study conducted on the Davao del Sur area by the 10th Infantry (AGILA) division", "id": 1},
//    {"datePublish": "2010-01-01", "type": "Interview", "name": "Davao del Sur Area Study 2010", "description": "Area study conducted on the Davao del Sur area by the 10th Infantry (AGILA) division", "id": 2}];

function initialize() {
    document.getElementById("global-username").innerHTML = userFullName + " ";
    showAndDismissAlert('success', 'Data Sources of <strong>SHIELD</strong>');
    var dropdown = document.getElementById("source-type");
    clssJSON.forEach(function (conf) {
        var option = document.createElement("option");
        option.setAttribute("label", toTitleCase(conf.valueText));
        option.setAttribute("value", conf.id);
        dropdown.appendChild(option);
    });
}

//Data Table Function
$(document).ready(function () {
    table = $('#source-table').DataTable({
        "ajax": {
            "url": "GetAllSources",
            "dataSrc": ""
        },
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "columns": [
            {"data": "classDesc"},
            {"data": "title"},
            {"data": "desc"},
            {"data": "published"},
            {"data": "encoded"}
        ],
        "columnDefs": [
            {
                "render": function (data, type, row) {
                    return toTitleCase(data);
                },
                "targets": 0
            }
        ],
        "columnDefs": [
            {
                "render": function (data, type, row) {
                    return toTitleCase(data);
                },
                "targets": 0
            }
        ],
        "fnRowCallback": function (nRow, data) {
            /* Turn the fourt row -- progress -- into a progressbar with bootstrap */
            if (data.version == 1)
                srcName = '<label style="font-weight:500;">'+toTitleCase(data.title)+'</label>';
            else {
                srcName = '<label style="font-weight:500;">'+toTitleCase(data.title) + ' v' + data.version+'</label>';
            }
            $('td:eq(1)', nRow).html(srcName);
            return nRow;
        }
    });
    $('#source-table tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        window.location.assign("ENSourceView?id=" + data.id);
    });

    excerptSummaryTable = $('#excerpt-summary-table').DataTable({
        "ajax": {
            "url": "GetExcerptCountRegion",
            "dataSrc": ""
        },
        "lengthMenu": [[8, 25, 50, -1], [8, 25, 50, "All"]],
        "columns": [
            {"data": "strDim1"},
            {"data": "strDim2"},
            {"data": "intVal1"}
        ]
    });
});

function saveSource() {
    var proceed = true;
    var sourceClass = document.getElementById("source-type").value;
    var sourceName = document.getElementById("source-name").value;
    var sourceDesc = document.getElementById("source-description").value;
    var sourceDate = document.getElementById("source-date").value;
    if (checkIfEmpty(sourceName)) {
        showAndDismissAlert("danger", "Please input <strong>source name</strong>");
        proceed = false;
    }
    if (checkIfEmpty(sourceDesc)) {
        showAndDismissAlert("danger", "Please input <strong>source description</strong>");
        proceed = false;
    }

    if (sourceDate == null) {
        showAndDismissAlert("danger", "Please input <strong>source date</strong>");
        proceed = false;
    }
    if (proceed) {
        $.ajax({
            type: "GET",
            url: "SaveSource",
            data: {
                class: sourceClass,
                title: sourceName,
                desc: sourceDesc,
                published: sourceDate
            },
            success: function (response) {
                $('#addSource').modal('hide');
                showAndDismissAlert("success", "<strong>New Source</strong> has been <strong>added.</strong>");
                table.ajax.reload();
            }
        });
    }
}

function findSource() {
    if ($('#excerpt-id').val() !== "") {
        var excerptID = $('#excerpt-id').val();
        $.ajax({
            type: "GET",
            url: "GetSourceIDExcerpt",
            data: {
                excerptID: excerptID
            },
            success: function (response) {
                $('#findSource').modal('hide');
                if (response.sourceID == -1)
                    showAndDismissAlert("warning", "<strong>Failed! No excerpt found</strong> with that <strong>ID.</strong>");
                else {
                    showAndDismissAlert("success", "<strong>Source Found!</strong>");
                    window.location.assign("ENSourceView?id=" + response.sourceID);
                }

            }
        });
    }
}