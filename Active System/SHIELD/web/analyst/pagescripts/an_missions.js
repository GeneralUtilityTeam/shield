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
            {"data": "status"},
            {"data": "status"},
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

            /* Turn the fourt row -- progress -- into a progressbar with bootstrap */
            if (data.status == 7)
                printBtn = '<button class="btn btn-primary" onclick="printReport(event,' + data.id + ');" style="display: block;   margin-left: auto;   margin-right: auto;"><span class="glyphicon glyphicon-print"></span> Print Report</button>';
            else {
                printBtn = "";
            }
            $('td:eq(3)', nRow).html(printBtn);
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

function printReport(event, id) {
    event.stopPropagation();
    var eentityCR = [];
    var crArr = [];
    $.ajax({
        type: "GET",
        url: "GetCROfMission",
        data: {
            missionID: id
        },
        success: function (responseJSON) {
            eentityCR = responseJSON;
            $.ajax({
                type: "GET",
                url: "GetPOSPOOfMission",
                data: {
                    missionID: id
                },
                success: function (responseJSON) {
                    var poArr = responseJSON;
                    var empty = true;
                    for (var x = 0; x < poArr.length; x++) {
                        var crObj;
                        var entity = poArr[x];
                        crObj = {id: entity.id, name: entity.name, po: entity.poText, cvList: eentityCR[x].cvList, spoList: entity.spoList};
                        crArr.push(crObj);
                    }
                    
                    
                }
            });
        }
    });
    
    
}