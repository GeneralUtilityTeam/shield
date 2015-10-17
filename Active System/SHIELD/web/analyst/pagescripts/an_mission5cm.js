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
        }
    });
});

function initialize() {
    //replace first parameter with Mission Status - msonJSOB.status
    buildNav(missionStatus, 5);
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
        panelHead.innerHTML = "<h5>" + eentityCR[x].name + ": CR</h5>";

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
        table.innerHTML = '<tr><td class="CV">Target Component (Critical Vulnerability)</td><td class="CARVER">Criticality</td><td class="CARVER">Accessibility</td><td class="CARVER">Recuperability</td><td class="CARVER">Vulnerability</td><td class="CARVER">Effect</td><td class="CARVER">Recognizability</td><td class="CARVER">Total</td></tr>"';

        var cvList = eentityCR[x].cvList;
        cvList.forEach(function (cv) {
            var tr = document.createElement("tr");

            var tdName = document.createElement("td");
            tdName.innerHTML = cv.name;
            tr.appendChild(tdName);

            var tdCrit = document.createElement("td");
            tdCrit.className = "CARVER";
            tdCrit.innerHTML = '<input id="' + id + 'crit' + cv.id + '" type="number" min="1" max="10" value= ' + cv.crit + '>';
            tr.appendChild(tdCrit);

            var tdAcce = document.createElement("td");
            tdAcce.className = "CARVER";
            tdAcce.innerHTML = '<input id="' + id + 'acce' + cv.id + '" type="number" min="1" max="10" value= ' + cv.acce + '>';
            tr.appendChild(tdAcce);

            var tdRecu = document.createElement("td");
            tdRecu.className = "CARVER";
            tdRecu.innerHTML = '<input id="' + id + 'recu' + cv.id + '" type="number" min="1" max="10" value= ' + cv.recu + '>';
            tr.appendChild(tdRecu);

            var tdVuln = document.createElement("td");
            tdVuln.className = "CARVER";
            tdVuln.innerHTML = '<input id="' + id + 'vuln' + cv.id + '" type="number" min="1" max="10" value= ' + cv.vuln + '>';
            tr.appendChild(tdVuln);

            var tdEffe = document.createElement("td");
            tdEffe.className = "CARVER";
            tdEffe.innerHTML = '<input id="' + id + 'effe' + cv.id + '" type="number" min="1" max="10" value= ' + cv.effe + '>';
            tr.appendChild(tdEffe);

            var tdReco = document.createElement("td");
            tdReco.className = "CARVER";
            tdReco.innerHTML = '<input id="' + id + 'reco' + cv.id + '" type="number" min="1" max="10" value= ' + cv.reco + '>';
            tr.appendChild(tdReco);

            table.appendChild(tr);

            var tdTotal = document.createElement("td");
            tdTotal.className = "CARVER";
            tdTotal.innerHTML = '<input id="' + id + 'total' + cv.id + '" type="number" min="1" max="60">';
            tr.appendChild(tdTotal);

        });

        panelBody.appendChild(table);
        panelCollapse.appendChild(panelBody);
        panel.appendChild(panelHead);
        panel.appendChild(panelCollapse);
        collapse.appendChild(panel);

    }
}

function loadMatrixes() {
    var carverDiv = document.getElementById("matrix-div");
    for (var x = 0; x < carvJSON.length; x++) {
        //Table
        var table = document.createElement('table');
        table.className = 'table table-bordered';
        table.innerHTML = '<caption class="matrix-caption">' + carvJSON[x].crText.toUpperCase() + ' - CARVER MATRIX</caption>'
        //THeader
        var thead = document.createElement('thead');

        var headRow = thead.insertRow(0);
        var cvHeader = headRow.insertCell(0);
        cvHeader.innerHTML = 'Target Component (Critical Vulnerability)';
        cvHeader.className = 'CV';
        var cHeader = headRow.insertCell(1);
        cHeader.innerHTML = 'Criticality';
        cHeader.className = 'CARVER';
        var aHeader = headRow.insertCell(2);
        aHeader.innerHTML = 'Accessibility';
        aHeader.className = 'CARVER';
        var rHeader = headRow.insertCell(3);
        rHeader.innerHTML = 'Recuperability';
        rHeader.className = 'CARVER';
        var vHeader = headRow.insertCell(4);
        vHeader.innerHTML = 'Vulnerability';
        vHeader.className = 'CARVER';
        var eHeader = headRow.insertCell(5);
        eHeader.innerHTML = 'Effect';
        eHeader.className = 'CARVER';
        var r2Header = headRow.insertCell(6);
        r2Header.innerHTML = 'Recognizability';
        r2Header.className = 'CARVER';
        var totalHeader = headRow.insertCell(7);
        totalHeader.innerHTML = "Total";
        totalHeader.className = 'CARVER';
        table.appendChild(thead);

        //TBody
        var tbody = document.createElement('tbody');
        var crID = carvJSON[x].crID;
        var cv;
        for (var y = 0; y < carvJSON[x].cvList.length; y++) {
            cv = carvJSON[x].cvList[y];
            var crRow = tbody.insertRow(y);
            var cvHeader = crRow.insertCell(0);
            cvHeader.innerHTML = cv.text;
            cvHeader.className = 'CV';
            var cHeader = crRow.insertCell(1);
            cHeader.innerHTML = "<input id='" + crID + 'C' + cv.cvID + "' type='number' onchange='calculateCV(" + crID + "," + cv.cvID + ")'  min='1' max='10' onKeyPress='return numbersonly(this, event)' value = '" + cv.criticality + "'>";
            cHeader.className = 'CARVER';
            var aHeader = crRow.insertCell(2);
            aHeader.innerHTML = "<input id='" + crID + 'A' + cv.cvID + "' type='number' onchange='calculateCV(" + crID + "," + cv.cvID + ")'  min='1' max='10' onKeyPress='return numbersonly(this, event)' value = '" + cv.accessibility + "'>";
            aHeader.className = 'CARVER';
            var rHeader = crRow.insertCell(3);
            rHeader.innerHTML = "<input id='" + crID + 'R' + cv.cvID + "' type='number' onchange='calculateCV(" + crID + "," + cv.cvID + ")'  min='1' max='10' onKeyPress='return numbersonly(this, event)' value = '" + cv.recuperability + "'>";
            rHeader.className = 'CARVER';
            var vHeader = crRow.insertCell(4);
            vHeader.innerHTML = "<input id='" + crID + 'V' + cv.cvID + "' type='number' onchange='calculateCV(" + crID + "," + cv.cvID + ")'  min='1' max='10' onKeyPress='return numbersonly(this, event)' value = '" + cv.vulnerability + "'>";
            vHeader.className = 'CARVER';
            var eHeader = crRow.insertCell(5);
            eHeader.innerHTML = "<input id='" + crID + 'E' + cv.cvID + "' type='number' onchange='calculateCV(" + crID + "," + cv.cvID + ")'  min='1' max='10' onKeyPress='return numbersonly(this, event)' value = '" + cv.effect + "'>";
            eHeader.className = 'CARVER';
            var r2Header = crRow.insertCell(6);
            r2Header.innerHTML = "<input id='" + crID + 'RT' + cv.cvID + "' type='number' onchange='calculateCV(" + crID + "," + cv.cvID + ")'  min='1' max='10' onKeyPress='return numbersonly(this, event)' value = '" + cv.recognizability + "'>";
            r2Header.className = 'CARVER';
            var totalHeader = crRow.insertCell(7);
            totalHeader.innerHTML = "<input id='" + crID + 'TO' + cv.cvID + "' type='number' onchange='calculateCV(" + crID + "," + cv.cvID + ")'  min='1' max='10' value = '" + cv.total + "' disabled>";
            totalHeader.className = 'CARVER';
        }
        var lastCell = tbody.insertRow(y).insertCell(0);
        lastCell.setAttribute('colspan', 8);
        lastCell.innerHTML = "<b>Legend</b><p>10 - High Desirability for attacking the target.</p><p>5 - Average Desirability for attacking the target.</p><p>1 - Low Desirability for attacking the target.</p>";
        table.appendChild(tbody);
        carverDiv.appendChild(table);
        carverDiv.appendChild(document.createElement('br'));
    }
}
function calculateCV(crID, cvID) {
    var c = parseInt(document.getElementById(crID + "C" + cvID).value);
    var a = parseInt(document.getElementById(crID + "A" + cvID).value);
    var r = parseInt(document.getElementById(crID + "R" + cvID).value);
    var v = parseInt(document.getElementById(crID + "V" + cvID).value);
    var e = parseInt(document.getElementById(crID + "E" + cvID).value);
    var rt = parseInt(document.getElementById(crID + "RT" + cvID).value);
    document.getElementById(crID + "TO" + cvID).value = c + a + r + v + e + rt;
}

function saveCM() {
    $.ajax({
        type: "GET",
        url: "Save5CM",
        success: function (response) {
            showAndDismissAlert("success", response);
            setTimeout(function () {
                window.location.assign("ANMission6PO")
            }, 3000);
        }
    });
}