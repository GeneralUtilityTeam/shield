var eentityCR;

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "GetCROfMission",
        data: {
            missionID: missionID
        },
        success: function (responseJSON) {
            eentityCR = responseJSON;
            initialize();
            console.log(eentityCR);
        }
    });
});

function initialize() {
    buildNav(missionStatus, 6);
    buildCarver();
}

function buildCarver() {
    var collapse = document.getElementById("accordion");

    for (var x = 0; x < eentityCR.length; x++) {
        //Panel Element
        var id = eentityCR[x].id;
        var panel = document.createElement("div");
        panel.className = "panel panel-default";
        panel.id = "panel" + id;

        //Panel Header
        var panelHead = document.createElement("div");
        panelHead.className = "panel-heading";
        panelHead.id = "panelHead" + id;
        panelHead.setAttribute("data-toggle", "collapse");
        panelHead.setAttribute("data-parent", "#accordion");
        panelHead.setAttribute("href", "#collapse" + id);
        panelHead.innerHTML = "<h5><b>Critical Requirement: " + toTitleCase(eentityCR[x].name) + "</b></h5>";
        panelHead.style.textAlign = "center";
        panelHead.style.backgroundColor = "rgba(230,230,230,1.0)";


        //Panel Collapse
        var panelCollapse = document.createElement("div");
        panelCollapse.className = "panel-collapse collapse";
        panelCollapse.id = "collapse" + id;

        //Panel Body
        var panelBody = document.createElement("div");
        panelBody.className = "panel-body";
        panelBody.id = "panelBody" + id;

        var table = document.createElement("table");
        table.className = "table table-bordered";
        table.style.width = "100%";
        table.innerHTML = '<thead><tr style="border: solid 1px #B2B2B2; background-color: #F5F5F5; font-weight: 700;"><td class="CV">Critical Vulnerability</td><td class="CARVER">Criticality</td><td class="CARVER">Accessibility</td><td class="CARVER">Recuperability</td><td class="CARVER">Vulnerability</td><td class="CARVER">Effect</td><td class="CARVER">Recognizability</td><td class="CARVER">Total</td></tr></thead>';

        $(table).DataTable({
            data: eentityCR[x].cvList,
            columns: [
                {"data": "name"},
                {"data": "crit"},
                {"data": "acce"},
                {"data": "recu"},
                {"data": "vuln"},
                {"data": "effe"},
                {"data": "reco"},
                {"data": null}
            ], "columnDefs": [
                {
                    "render": function (data, type, row) {
                        return toTitleCase(data);
                    },
                    "targets": 0
                },
                {
                    "render": function (data, type, row) {
                        var total = data.crit + data.acce + data.recu + data.vuln + data.effe + data.reco;
                        return total;
                    },
                    "targets": 7
                },
                {"sClass": "alignCenter", "targets": [1, 2, 3, 4, 5, 6,7]},
                {"sClass": "bold", "targets": [0]}
            ]
        });

        panelBody.appendChild(table);
        panelCollapse.appendChild(panelBody);
        panel.appendChild(panelHead);
        panel.appendChild(panelCollapse);
        collapse.appendChild(panel);

    }

}

function savePO() {
    $.ajax({
        type: "GET",
        url: "Save6PO",
        success: function (response) {
            showAndDismissAlert("success", response);
            window.location.assign("ANMissions");
        }
    });
}