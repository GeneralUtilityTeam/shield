function initialize() {
    showAndDismissAlert('success', 'Existing Missions of <strong>SHIELD</strong>');
}
//Data Table Function
$(document).ready(function () {
    var table = $('#mission-table').DataTable({
        "ajax": {
            "url": "GetAllMissions",
            "dataSrc": ""
        },
        "lengthMenu": [[6, 10, 25, 50, -1], [6, 10, 25, 50, "All"]],
        "columns": [
            {"data": "title"},
            {"data": "area"},
            {"data": "status"}
        ],
        "columnDefs": [
            {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function (data, type, row) {
                    return generateFullAddress(data);
                },
                "targets": 1
            }
        ],
        "fnRowCallback": function (nRow, data) {
            /* Turn the fourt row -- progress -- into a progressbar with bootstrap */
            if (data.status < 7)
                progressString = '<div class="progress active"><div class="progress-bar ' + defineProgressBar(data.status) + '" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: ' + data.status * 14.28 + '%;">' + data.status + ' of 6 Steps</div></div>';
            else {
                progressString = '<div class="progress active"><div class="progress-bar ' + defineProgressBar(data.status) + '" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: ' + data.status * 14.28 + '%;"> Mission Completed</div></div>';
            }
            $('td:eq(2)', nRow).html(progressString);
            return nRow;
        }
    });
    $('#mission-table tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        window.location.assign("ANMission1MD?id=" + data.id);
    });
});

function defineProgressBar(status) {
    var progressBar;
    if (status == 1 || status == 2) {
        return progressBar = "progress-bar-danger";
    }
    else if (status == 3 || status == 4) {
        return progressBar = "progress-bar-warning";
    }
    else if (status == 5 || status == 6) {
        return progressBar = "progress-bar-info";
    }
    else if (status == 7) {
        return progressBar = "progress-bar-success";
    }
}

function defineProgressPercent(status) {
    var statusInt = parseInt(status);
    return statusInt * 14.28;
}
