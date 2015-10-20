function initialize() {
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
        "lengthMenu": [[7, 10, 25, 50, -1], [7, 10, 25, 50, "All"]],
        "columns": [
            {"data": "classDesc"},
            {"data": "title"},
            {"data": "desc"},
            {"data": "published"}
        ],
        "columnDefs": [
            {
                "render": function (data, type, row) {
                    return toTitleCase(data);
                },
                "targets": 0
            }
        ]
    });
    $('#source-table tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        window.location.assign("ANSourceView?id=" + data.id);
    });
});

function saveSource() {
    var proceed = true;
    var sourceClass = document.getElementById("source-type").value;
    var sourceName = document.getElementById("source-name").value;
    var sourceDesc = document.getElementById("source-description").value;
    var sourceDate = document.getElementById("source-date").value;
    if (checkIfEmpty(sourceName)) {
        showAndDismissAlert("danger", "Please Input <strong>Source Name.</strong>");
        proceed = false;
    }
    if (checkIfEmpty(sourceDesc)) {
        showAndDismissAlert("danger", "Please Input <strong>Source Description.</strong>");
        proceed = false;
    }
    if (sourceDate.value == null) {
        showAndDismissAlert("danger", "Please Input <strong>Source Published Date.</strong>");
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