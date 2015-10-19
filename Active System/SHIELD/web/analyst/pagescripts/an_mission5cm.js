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
        table.innerHTML = '<tr style="border: solid 1px #B2B2B2; background-color: #F5F5F5; font-weight: 700;"><td class="CV" style="border: solid 1px #B2B2B2;">Target Component (Critical Vulnerability)</td><td class="CARVER crit" style="border: solid 1px #B2B2B2;">Criticality</td><td class="CARVER acce" style="border: solid 1px #B2B2B2;">Accessibility</td><td class="CARVER recu" style="border: solid 1px #B2B2B2;">Recuperability</td><td class="CARVER vuln" style="border: solid 1px #B2B2B2;">Vulnerability</td><td class="CARVER effe" style="border: solid 1px #B2B2B2;">Effect</td><td class="CARVER reco" style="border: solid 1px #B2B2B2;">Recognizability</td><td class="CARVER" style="border: solid 1px #B2B2B2;">Total</td></tr>';

        var cvList = eentityCR[x].cvList;
        cvList.forEach(function (cv) {
            var tr = document.createElement("tr");
            tr.style.border = "solid 1px #B2B2B2";
            tr.style.padding = "10px";

            var tdName = document.createElement("td");
            tdName.innerHTML = toTitleCase(cv.name);
            tdName.style.paddingLeft = "10px";
            tdName.style.fontWeight = "700";
            tdName.style.paddingTop = "10px";
            tdName.style.paddingBottom = "10px";
            tdName.style.border = "solid 1px #B2B2B2";
            tr.appendChild(tdName);

            var tdCrit = document.createElement("td");
            tdCrit.className = "CARVER crit";
            tdCrit.innerHTML = '<input id="' + id + 'crit' + cv.id + '" type="number" min="1" max="10" value= "' + cv.crit + '" onchange="calculateCV(' + id + ',' + cv.id + ')" style="text-align:center;">';
            tdCrit.style.border = "solid 1px #B2B2B2";
            tr.appendChild(tdCrit);

            var tdAcce = document.createElement("td");
            tdAcce.className = "CARVER acce";
            tdAcce.innerHTML = '<input id="' + id + 'acce' + cv.id + '" type="number" min="1" max="10" value= "' + cv.acce + '" onchange="calculateCV(' + id + ',' + cv.id + ')" style="text-align:center;">';
            tdAcce.style.border = "solid 1px #B2B2B2";
            tr.appendChild(tdAcce);

            var tdRecu = document.createElement("td");
            tdRecu.className = "CARVER recu";
            tdRecu.innerHTML = '<input id="' + id + 'recu' + cv.id + '" type="number" min="1" max="10" value= "' + cv.recu + '" onchange="calculateCV(' + id + ',' + cv.id + ')" style="text-align:center;">';
            tdRecu.style.border = "solid 1px #B2B2B2";
            tr.appendChild(tdRecu);

            var tdVuln = document.createElement("td");
            tdVuln.className = "CARVER vuln";
            tdVuln.innerHTML = '<input id="' + id + 'vuln' + cv.id + '" type="number" min="1" max="10" value= "' + cv.vuln + '" onchange="calculateCV(' + id + ',' + cv.id + ')" style="text-align:center;">';
            tdVuln.style.border = "solid 1px #B2B2B2";
            tr.appendChild(tdVuln);

            var tdEffe = document.createElement("td");
            tdEffe.className = "CARVER effe";
            tdEffe.innerHTML = '<input id="' + id + 'effe' + cv.id + '" type="number" min="1" max="10" value= "' + cv.effe + '" onchange="calculateCV(' + id + ',' + cv.id + ')" style="text-align:center;">';
            tdEffe.style.border = "solid 1px #B2B2B2";
            tr.appendChild(tdEffe);

            var tdReco = document.createElement("td");
            tdReco.className = "CARVER reco";
            tdReco.innerHTML = '<input id="' + id + 'reco' + cv.id + '" type="number" min="1" max="10" value= "' + cv.reco + '" onchange="calculateCV(' + id + ',' + cv.id + ')" style="text-align:center;">';
            tdReco.style.border = "solid 1px #B2B2B2";
            tr.appendChild(tdReco);

            var initialTotal = cv.crit + cv.acce + cv.recu + cv.vuln + cv.effe + cv.reco;

            var tdTotal = document.createElement("td");
            tdTotal.className = "CARVER";
            tdTotal.innerHTML = '<input id="' + id + 'total' + cv.id + '" type="number" min="1" max="60" value= "' + initialTotal + '" disabled style="text-align:center;">';
            tdTotal.style.border = "solid 1px #B2B2B2";
            tr.appendChild(tdTotal);

            table.appendChild(tr);

        });

        var guideTable = document.createElement("table");
        guideTable.id = "guideTable" + id;
        guideTable.className = "table table-bordered";
        guideTable.innerHTML = '<tr><td width="80%" style="text-align:center; font-weight: 700;">Criteria</td><td width="20%" style="text-align:center; font-weight: 700;">Scale</td></tr>';

        guideTable.innerHTML += '<tr><td width="80%"></td><td width="20%" style="text-align:center;">9-10</td></tr>';
        guideTable.innerHTML += '<tr><td width="80%"></td><td width="20%" style="text-align:center;">7-8</td></tr>';
        guideTable.innerHTML += '<tr><td width="80%"></td><td width="20%" style="text-align:center;">5-6</td></tr>';
        guideTable.innerHTML += '<tr><td width="80%"></td><td width="20%" style="text-align:center;">3-4</td></tr>';
        guideTable.innerHTML += '<tr><td width="80%"></td><td width="20%" style="text-align:center;">1-2</td></tr>';

        assignListener(panelCollapse, id);

        panelBody.appendChild(table);
        panelBody.appendChild(guideTable);
        panelCollapse.appendChild(panelBody);
        panel.appendChild(panelHead);
        panel.appendChild(panelCollapse);
        collapse.appendChild(panel);

    }

}

function assignListener(panel, id) {

    $(panel).on('show.bs.collapse', function () {

        $('.crit').on('click', function () {
            $("#guideTable" + id + " tr:eq(1) td:eq(0)").text("Immediate effect on the threat's CR; the threat cannot function without the CV.");
            $("#guideTable" + id + " tr:eq(2) td:eq(0)").text("Effect within 1 week on the threat's CR.");
            $("#guideTable" + id + " tr:eq(3) td:eq(0)").text("Effect within 1 month on the threat's CR.");
            $("#guideTable" + id + " tr:eq(4) td:eq(0)").text("Effect within 2 months on the threat's CR.");
            $("#guideTable" + id + " tr:eq(5) td:eq(0)").text("No significant effect on the threat's CR.");

        });
        $('.acce').on('click', function () {
            $("#guideTable" + id + " tr:eq(1) td:eq(0)").text("Easily accessible; target can be reached by all PSYOP diessemination methods, to include face-to-face communication.");
            $("#guideTable" + id + " tr:eq(2) td:eq(0)").text("Moderately accessible due to threat and terrain; target can be reached by all PSYOP dissemination methods, to include face-to-face communication.");
            $("#guideTable" + id + " tr:eq(3) td:eq(0)").text("Limited accessibility due to threat and terrain; target can be reached by all PSYOP dissemination methods, to include face-to-face communication.");
            $("#guideTable" + id + " tr:eq(4) td:eq(0)").text("Only accessible by leaflet air drop and aerial broadcast station dissemination");
            $("#guideTable" + id + " tr:eq(5) td:eq(0)").text("Not accessible or inaccessible due to terrain, ground threat level, air defense threat level, and lack of receivers.");

        });
        $('.recu').on('click', function () {
            $("#guideTable" + id + " tr:eq(1) td:eq(0)").text("Mitigation of the effects of the PSYOP series requires 1 month or more.");
            $("#guideTable" + id + " tr:eq(2) td:eq(0)").text("Mitigation of the effects of the PSYOP series requires 1 week to 1 month.");
            $("#guideTable" + id + " tr:eq(3) td:eq(0)").text("Mitigation of the effects of the PSYOP series requires 72 hours to 1 week.");
            $("#guideTable" + id + " tr:eq(4) td:eq(0)").text("Mitigation of the effects of the PSYOP series requires 24 to 72 hours.");
            $("#guideTable" + id + " tr:eq(5) td:eq(0)").text("Same day mitigation of the effects of the PSYOP series");

        });
        $('.vuln').on('click', function () {
            $("#guideTable" + id + " tr:eq(1) td:eq(0)").text("Very vulnerable to PSYOP products and actions due to existing target characteristics, motives, or conditions.");
            $("#guideTable" + id + " tr:eq(2) td:eq(0)").text("Vulnerable to influence by PSYOP products and actions due to existing target characteristics, motives, or conditions.");
            $("#guideTable" + id + " tr:eq(3) td:eq(0)").text("Moderately vulnerable to influence by PSYOP products and actions due to existing target characteristics, motives, or conditions.");
            $("#guideTable" + id + " tr:eq(4) td:eq(0)").text("Slightly vulnerable to influence by PSYOP products and actions due to existing target characteristics, motives, or conditions.");
            $("#guideTable" + id + " tr:eq(5) td:eq(0)").text("Invulnerable to influence by PSYOP products and actions due to existing target characteristics, motives, or conditions.");

        });
        $('.effe').on('click', function () {
            $("#guideTable" + id + " tr:eq(1) td:eq(0)").text("Overwhelming positive effects; no significant negative effects.");
            $("#guideTable" + id + " tr:eq(2) td:eq(0)").text("Moderately positive effects; no significant negative effects.");
            $("#guideTable" + id + " tr:eq(3) td:eq(0)").text("No significant effects; neutral.");
            $("#guideTable" + id + " tr:eq(4) td:eq(0)").text("Moderately negative effects; few significant positive effects.");
            $("#guideTable" + id + " tr:eq(5) td:eq(0)").text("Overwhelmingly negative effects; no significant positive effects.");

        });
        $('.reco').on('click', function () {
            $("#guideTable" + id + " tr:eq(1) td:eq(0)").text("The target is clearly recognizable; impact indicators require little effort for collection.");
            $("#guideTable" + id + " tr:eq(2) td:eq(0)").text("The target is easily recognizable; impact indicators require slight effort for collection.");
            $("#guideTable" + id + " tr:eq(3) td:eq(0)").text("The target is difficult to recognize or might be confused with other targets; impact indicators require a moderate effort for collection.");
            $("#guideTable" + id + " tr:eq(4) td:eq(0)").text("The target is difficult to recognize, even with close range, without the aid of location nationals or regional experts; the target is easily confused with other targets and impact indicators require a significant effort for collection.");
            $("#guideTable" + id + " tr:eq(5) td:eq(0)").text("The target cannot be recognized under any conditions, except by location nationals or regional experts; impact indicators are near impossible to collect.");

        });

    });
    $(panel).on('hide.bs.collapse', function () {

    });
}

function calculateCV(crID, cvID) {
    var c = parseInt(document.getElementById(crID + "crit" + cvID).value);
    var a = parseInt(document.getElementById(crID + "acce" + cvID).value);
    var r = parseInt(document.getElementById(crID + "recu" + cvID).value);
    var v = parseInt(document.getElementById(crID + "vuln" + cvID).value);
    var e = parseInt(document.getElementById(crID + "effe" + cvID).value);
    var rt = parseInt(document.getElementById(crID + "reco" + cvID).value);
    document.getElementById(crID + "total" + cvID).value = c + a + r + v + e + rt;
}

function saveCM() {
    var eentityCV = [];
    for (var x = 0; x < eentityCR.length; x++) {
        for (var y = 0; y < eentityCR[x].cvList.length; y++) {
            eentityCR[x].cvList[y].crit = parseInt($('#' + eentityCR[x].id + 'crit' + eentityCR[x].cvList[y].id).val());
            eentityCR[x].cvList[y].acce = parseInt($('#' + eentityCR[x].id + 'acce' + eentityCR[x].cvList[y].id).val());
            eentityCR[x].cvList[y].recu = parseInt($('#' + eentityCR[x].id + 'recu' + eentityCR[x].cvList[y].id).val());
            eentityCR[x].cvList[y].vuln = parseInt($('#' + eentityCR[x].id + 'vuln' + eentityCR[x].cvList[y].id).val());
            eentityCR[x].cvList[y].effe = parseInt($('#' + eentityCR[x].id + 'effe' + eentityCR[x].cvList[y].id).val());
            eentityCR[x].cvList[y].reco = parseInt($('#' + eentityCR[x].id + 'reco' + eentityCR[x].cvList[y].id).val());
            eentityCV.push(eentityCR[x].cvList[y]);
        }
    }
    console.log(eentityCV);
    $.ajax({
        type: "GET",
        url: "Save5CM",
        data: {
            cvJArr: toJSON(eentityCV)
        },
        success: function (response) {
            showAndDismissAlert("success", "<strong>CARVER Methodology</strong> has been <strong>saved.</strong>");
            window.location.assign("ANMission6PO");
        }
    });
}