var geocoder;
var area;
var latLng;

function initialize() {
    document.getElementById("global-username").innerHTML = userFullName + " ";
    showAndDismissAlert('success', 'Existing Missions of <strong>SHIELD</strong>');
    initializeGeocoder();
}
//Data Table Function
$(document).ready(function () {
    geocoder = new google.maps.Geocoder();
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

    var missionDetails;
    //Write Mission Details on Print Report
    $.ajax({
        type: "GET",
        url: "GetMissionDetails",
        data: {
            id: id
        },
        async : false,
        success: function (responseJSON) {
            missionDetails = responseJSON;
            document.getElementById("mission-title").innerHTML = 'Psychological Operations Plan "' + missionDetails.title + '"';
            document.getElementById("situation-content").innerHTML = missionDetails.situation;
            document.getElementById("objective-content").innerHTML = missionDetails.objective;
            document.getElementById("execution-content").innerHTML = missionDetails.execution;
            document.getElementById("admin-and-logistics-content").innerHTML = missionDetails.adminAndLogistics;
            document.getElementById("command-and-signal-content").innerHTML = missionDetails.commandAndSignal;
        }
    });

    var eentityCR = [];
    var crArr = [];
    var divElements;
    var oldPage;
    $.ajax({
        type: "GET",
        url: "GetCROfMission",
        data: {
            missionID: id
        },
        async: false,
        success: function (responseJSON) {
            eentityCR = responseJSON;

            $.ajax({
                type: "GET",
                url: "GetPOSPOOfMission",
                data: {
                    missionID: id
                },
                async: false,
                success: function (responseJSON) {
                    var poArr = responseJSON;
                    var empty = true;
                    for (var x = 0; x < poArr.length; x++) {
                        var crObj;
                        var entity = poArr[x];
                        crObj = {id: entity.id, name: entity.name, po: entity.poText, cvList: eentityCR[x].cvList, spoList: entity.spoList};
                        crArr.push(crObj);
                    }
                    console.log(crArr);

                    var content = document.getElementById("report-content");
                    content.innerHTML = "";



                    for (var x = 0; x < crArr.length; x++) {

                        //PO CONTENT
                        var poLabel = document.createElement("label");
                        poLabel.className = "supporting-info";
                        poLabel.innerHTML = "PSYCHOLOGICAL OPERATIONS OBJECTIVE " + (x + 1);
                        content.appendChild(poLabel);

                        var poTable = document.createElement("table");
                        poTable.className = "text-table-print";

                        var poThead = document.createElement("thead");

                        var poTr = document.createElement("tr");
                        poTr.className = "po-row";
                        var poTd = document.createElement("td");
                        poTd.className = "po";
                        poTd.innerHTML = "<b>PO: </b>" + crArr[x].po;
                        poTr.appendChild(poTd);

                        poThead.appendChild(poTr);


                        for (var y = 0; y < crArr[x].spoList.length; y++) {
                            var spoTr = document.createElement("tr");
                            var spoTd = document.createElement("td");
                            spoTd.className = "spo";
                            spoTd.innerHTML = "SPO " + (y + 1) + ": " + crArr[x].spoList[y].text;

                            spoTr.appendChild(spoTd);

                            var cvTr = document.createElement("tr");
                            var cvTd = document.createElement("td");
                            cvTd.className = "cvref";
                            cvTd.innerHTML = "CV Reference: ";
                            for (var z = 0; z < crArr[x].spoList[y].cvIDList.length; z++) {
                                for (var i = 0; i < crArr[x].cvList.length; i++) {
                                    if (crArr[x].spoList[y].cvIDList[z] == crArr[x].cvList[i].id) {
                                        if (crArr[x].spoList[y].cvIDList.length > 1)
                                            cvTd.innerHTML += toTitleCase(crArr[x].cvList[i].name) + ", ";
                                        else {
                                            cvTd.innerHTML += toTitleCase(crArr[x].cvList[i].name);
                                        }
                                    }
                                }
                            }
                            cvTr.appendChild(cvTd);

                            poThead.appendChild(spoTr);
                            poThead.appendChild(cvTr);
                        }

                        poTable.appendChild(poThead);
                        content.appendChild(poTable);

                        //CR CONTENT
                        var supportingInformationLabel = document.createElement("label");
                        supportingInformationLabel.className = "supporting-label";
                        supportingInformationLabel.innerHTML = "Supporting Information: ";

                        content.appendChild(supportingInformationLabel);

                        var carverTable = document.createElement("table");
                        carverTable.className = "table-print";

                        var crTr = document.createElement("tr");
                        crTr.className = "carver-row";
                        var crTd = document.createElement("td");
                        crTd.className = "criticalreq";
                        crTd.setAttribute("colspan", "8");
                        crTd.innerHTML = "Critical Requirement: " + toTitleCase(crArr[x].name);
                        crTr.appendChild(crTd);

                        var crHeaderTr = document.createElement("tr");
                        crHeaderTr.className = "carver-row";

                        var tdHeaderName = document.createElement("td");
                        tdHeaderName.className = "cv";
                        tdHeaderName.innerHTML = "<b>Critical Vulnerability</b>";
                        crHeaderTr.appendChild(tdHeaderName);

                        var tdHeaderCrit = document.createElement("td");
                        tdHeaderCrit.className = "CM";
                        tdHeaderCrit.innerHTML = "<b>C</b>";
                        crHeaderTr.appendChild(tdHeaderCrit);

                        var tdHeaderAcce = document.createElement("td");
                        tdHeaderAcce.className = "CM";
                        tdHeaderAcce.innerHTML = "<b>A</b>";
                        crHeaderTr.appendChild(tdHeaderAcce);

                        var tdHeaderRecu = document.createElement("td");
                        tdHeaderRecu.className = "CM";
                        tdHeaderRecu.innerHTML = "<b>R</b>";
                        crHeaderTr.appendChild(tdHeaderRecu);

                        var tdHeaderVuln = document.createElement("td");
                        tdHeaderVuln.className = "CM";
                        tdHeaderVuln.innerHTML = "<b>V</b>";
                        crHeaderTr.appendChild(tdHeaderVuln);

                        var tdHeaderEffe = document.createElement("td");
                        tdHeaderEffe.className = "CM";
                        tdHeaderEffe.innerHTML = "<b>E</b>";
                        crHeaderTr.appendChild(tdHeaderEffe);

                        var tdHeaderReco = document.createElement("td");
                        tdHeaderReco.className = "CM";
                        tdHeaderReco.innerHTML = "<b>R</b>";
                        crHeaderTr.appendChild(tdHeaderReco);

                        var tdHeaderTotal = document.createElement("td");
                        tdHeaderTotal.className = "CM";
                        tdHeaderTotal.innerHTML = "<b>Total</b>";
                        crHeaderTr.appendChild(tdHeaderTotal);

                        carverTable.appendChild(crTr);
                        carverTable.appendChild(crHeaderTr);

                        var cvList = crArr[x].cvList;
                        cvList.forEach(function (cv) {
                            var tr = document.createElement("tr");
                            tr.className = "carver-row";

                            var tdName = document.createElement("td");
                            tdName.className = "cv";
                            tdName.innerHTML = toTitleCase(cv.name);
                            tr.appendChild(tdName);

                            var tdCrit = document.createElement("td");
                            tdCrit.className = "CM";
                            tdCrit.innerHTML = cv.crit;
                            tr.appendChild(tdCrit);

                            var tdAcce = document.createElement("td");
                            tdAcce.className = "CM";
                            tdAcce.innerHTML = cv.acce;
                            tr.appendChild(tdAcce);

                            var tdRecu = document.createElement("td");
                            tdRecu.className = "CM";
                            tdRecu.innerHTML = cv.recu;
                            tr.appendChild(tdRecu);

                            var tdVuln = document.createElement("td");
                            tdVuln.className = "CM";
                            tdVuln.innerHTML = cv.vuln;
                            tr.appendChild(tdVuln);

                            var tdEffe = document.createElement("td");
                            tdEffe.className = "CM";
                            tdEffe.innerHTML = cv.effe;
                            tr.appendChild(tdEffe);

                            var tdReco = document.createElement("td");
                            tdReco.className = "CM";
                            tdReco.innerHTML = cv.reco;
                            tr.appendChild(tdReco);

                            var initialTotal = cv.crit + cv.acce + cv.recu + cv.vuln + cv.effe + cv.reco;

                            var tdTotal = document.createElement("td");
                            tdTotal.className = "CM";
                            tdTotal.innerHTML = initialTotal;
                            tr.appendChild(tdTotal);

                            carverTable.appendChild(tr);

                        });
                        content.appendChild(carverTable);

                        var ccDiv = document.createElement("div");

                        $.ajax({
                            type: "GET",
                            url: "GetCCOfCR",
                            data: {
                                crID: crArr[x].id
                            },
                            async: false,
                            success: function (responseJSON) {

                                var ccArr = responseJSON;

                                var tcoaLabel = document.createElement("label");
                                tcoaLabel.className = "supporting-label";
                                tcoaLabel.innerHTML = "Possible Threat Courses of Action: ";

                                content.appendChild(tcoaLabel);
                                for (var y = 0; y < ccArr.length; y++) {
                                    var ccTable = document.createElement("table");
                                    ccTable.className = "text-table-print";

                                    var ccNameTr = document.createElement("tr");
                                    ccNameTr.className = "po-row";
                                    var ccNameTd = document.createElement("td");
                                    ccNameTd.className = "po";
                                    ccNameTd.innerHTML = "<b>Propaganda " + (y + 1) + "</b> The threat may launch/use/deploy <b>" + ccArr[y].name + ": </b>";
                                    ccNameTr.appendChild(ccNameTd);

                                    var ccFromTr = document.createElement("tr");
                                    var ccFromTd = document.createElement("td");
                                    ccFromTd.className = "spo";
                                    ccFromTd.innerHTML = "<b>From: </b>" + ccArr[y].dateFrom;
                                    ccFromTr.appendChild(ccFromTd);

                                    var ccToTr = document.createElement("tr");
                                    var ccToTd = document.createElement("td");
                                    ccToTd.className = "spo";
                                    ccToTd.innerHTML = "<b>To: </b>" + ccArr[y].dateTo;
                                    ccToTr.appendChild(ccToTd);

                                    var ccLocationTr = document.createElement("tr");
                                    var ccLocationTd = document.createElement("td");
                                    ccLocationTd.className = "spo";
                                    ccLocationTd.innerHTML = "<b>Location: </b>" + ccArr[y].address;
                                    ccLocationTr.appendChild(ccLocationTd);



                                    ccTable.appendChild(ccNameTr);
                                    ccTable.appendChild(ccFromTr);
                                    ccTable.appendChild(ccToTr);
                                    ccTable.appendChild(ccLocationTr);

                                    ccDiv.appendChild(ccTable);
                                }
                                content.appendChild(ccDiv);

                            }
                        });
                    }

                    divElements = document.getElementById("container").innerHTML;
                    oldPage = document.body.innerHTML;

                    //Reset the page's HTML with div's HTML only
                }
            });
        }
    });

    document.body.innerHTML = "<html><head><title></title></head><body>" + divElements + "</body>";
    window.print();
    document.body.innerHTML = oldPage;
}



function geocodeResultStringPrint(str) { // Takes String Address; Returns geocode results
    geocoder.geocode({
        'address': str
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            return geocodeSuccess(results[0]);
        } else {
            return null;
        }
    });
}
function syncGeocoderString(latLngStr, ccAddressID) {
    geocoder.geocode({
        'address': latLngStr
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            document.getElementById(ccAddressID).innerHTML = generateFullAddress(generateAreaObject(results[0]));
        } else {
            return null;
        }
    });
}
