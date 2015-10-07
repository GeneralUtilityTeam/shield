function initialize() {
    showAndDismissAlert('success', 'Data Sources of <strong>SHIELD</strong>');
    var dropdown = document.getElementById("source-type");
    clssJSON.forEach(function(conf){
        var option = document.createElement("option");
        option.setAttribute("label", conf.valueText);
        option.setAttribute("value", conf.id);
        dropdown.appendChild(option);
    });
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
            {"data": "classDesc"},
            {"data": "title"},
            {"data": "desc"},
            {"data": "published"}
        ]
    });
    $('#source-table tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        window.location.assign("ANSourceView?id=" + data.id);
    });
});

function saveSource() {
    var sourceType = document.getElementById("source-type").value;
    var sourceTypeVal = sourceType.options[sourceType.selectedIndex].text;
    var sourceName = document.getElementById("source-name").value;
    var sourceDesc = document.getElementById("source-description").value;
    var sourceDate = document.getElementById("source-date").value;
    $.ajax({
        type: "GET",
        url: "SaveSource",
        data: {
            type : sourceTypeVal,
            name: sourceName,
            description: sourceDesc,
            date: sourceDate
        },
        success: function (response) {
            $('#addSource').modal('hide');
            showAndDismissAlert("success", "<strong>New Source</strong> has been <strong>added.</strong>");
        }
    });
}