function initialize() {
    showAndDismissAlert('success', 'Data Sources of <strong>SHIELD</strong>');
}
//Data Table Function
$(document).ready(function () {
    var table = $('#source-table').DataTable({
        "ajax": {
            "url": "GetAllSources",
            "dataSrc": ""
        },
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "columns": [
            {"data": "type"},
            {"data": "name"},
            {"data": "description"},
            {"data": "datePublish"}
        ]
    });
    $('#source-table tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        window.location.assign("ANSourceView?id=" + data.id);
    });
});

function saveSource() {
    $.ajax({
        type: "GET",
        url: "SaveSource",
        success: function (response) {
            $('#addSource').modal('hide');
            showAndDismissAlert("success", "<strong>New Source</strong> has been <strong>added.</strong>");
        }
    });
}