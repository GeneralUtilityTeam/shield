var infrJSON;
var scndJSON;
var cartList = [];
var selectedID;
var selectedText;

function initialize() {
    buildNav(msonStatus, 2);
    $.ajax({
        type: "GET",
        url: "GetExcerptOfMission",
        data: {
            missionID: missionID,
        },
        success: function (responseJSON) {
            cartJSON = responseJSON;
            for (var x = 0; x < cartJSON.length; x++) {
                addSourceRow(cartJSON[x].id, cartJSON[x].text);
            }
            loadSummary();
        }
    });
}

$(document).ready(function () {
    $("#search-field").keydown(function () {

        if (event.keyCode == 13) {
            var table = document.getElementById('result-table');
            table.innerHTML = "<tr><td><img src='images/loading.gif' width='60' height='60'></img></td></tr>";
            $.ajax({
                type: "GET",
                url: "PrimaryExcerptSearch",
                data: {
                    param: $("#search-field").val()
                },
                success: function (responseJson) {
                    infrJSON = responseJson;
                    if (infrJSON.length > 0)
                        loadResult();
                    else
                        table.innerHTML = "<tr><td>No Results Found</td></tr>";
                }
            });
        }

    });
});

function addSourceRow(id, text, type) {
    var table = document.getElementById("source-table");
    var row = document.createElement("tr");
    row.id = 'sourceRow' + id;
    row.setAttribute('data-toggle', 'modal');
    row.setAttribute('data-target', '#viewExcerpt');
    row.setAttribute('onclick', 'loadExcerpt(' + id + ', false)');
    table.appendChild(row);
    var cell = row.insertCell(0);
    if (text.length > 150) {
        text = text.substring(0, 149) + "...";
    }
    cartList.push(id);
    cell.innerHTML = "<p>Excerpt " + id + "</p><p>" + text + "</p>";
}
function addRelatedRow(id, text) {
    var table = document.getElementById("related-table");
    var row = document.createElement("tr");
    var action = true;
    for (var y = 0; y < cartList.length; y++) {
        if (cartList[y] == id) {
            action = false;
            break;
        }
    }
    row.setAttribute('onclick', 'loadExcerpt(' + id + ', ' + action + ')');
    table.appendChild(row);
    var cell = row.insertCell(0);
    if (text.length > 150) {
        text = text.substring(0, 149) + "...";
    }
    cell.innerHTML = "<p>Excerpt " + id + "</p><p>" + text + "</p>";
}


function removeSourceRow(id) {
    var row = document.getElementById("sourceRow" + id);
    row.parentNode.removeChild(row);
}

function loadResult() {
    var table = document.getElementById('result-table');
    var glyphicon = "";
    var action;
    table.innerHTML = "";
    for (var x = 0; x < infrJSON.length; x++) {
        glyphicon = "";
        action = true;
        for (var y = 0; y < cartList.length; y++) {
            if (cartList[y] == infrJSON[x].excerpt.id) {
                glyphicon = '  <span class="glyphicon glyphicon-ok" style=" font-size: 1.4vw; color: #20cf6e; border-radius: 50%; border: solid 1px #D3D3D3; padding: 5px;"></span>';
                action = false;
                break;
            }
        }
        var row = table.insertRow(x);
        row.setAttribute('data-toggle', 'modal');
        row.setAttribute('data-target', '#viewExcerpt');
        row.setAttribute('onclick', 'loadExcerpt(' + infrJSON[x].excerpt.id + ', ' + action + ')');
        var cell = row.insertCell(0);
        var excrText = infrJSON[x].excerpt.text;
        if (excrText.length > 150) {
            excrText = excrText.substring(0, 149) + "...";
        }

        cell.innerHTML = "<h4>" + infrJSON[x].excerpt.sourceName + " - " + infrJSON[x].excerpt.id + glyphicon + "</h4><p>" + excrText + "</p><div class='progress'><div class='progress-bar progress-bar-warning' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width: " + infrJSON[x].textInference + "%;'></div> </div>";
    }
}

function loadExcerpt(id, action) {
    var excr;
    var modal = document.getElementById("view-modal-body");

    modal.setAttribute('style', 'visibility : hidden');
    $.ajax({
        type: "GET",
        url: "GetExcerpt",
        data: {
            excerptID: id
        },
        success: function (responseJSON) {
            document.getElementById('viewID').innerHTML = responseJSON.id;
            document.getElementById('viewText').innerHTML = responseJSON.text;
            document.getElementById('viewCategory').innerHTML = categoryFormater(responseJSON.categoryName);
            document.getElementById('viewSource').innerHTML = responseJSON.sourceName;
            document.getElementById('viewTags').value = responseJSON.tagsText;
            selectedID = responseJSON.id;
            selectedText = responseJSON.text;
            document.getElementById("related-table").innerHTML = "";
            $.ajax({
                type: "GET",
                url: "SecondaryExcerptSearch",
                data: {
                    param: responseJSON.id
                },
                success: function (responseJSON) {
                    for (var x = 0; x < responseJSON.length; x++) {
                        addRelatedRow(responseJSON[x].excerpt.id, responseJSON[x].excerpt.text);
                    }
                }
            });
            loadResult();
        }
    });

    modal.setAttribute('style', 'visibility : visible');

    var addBtn = document.getElementById('viewAddBtn');
    var removeBtn = document.getElementById('viewRemoveBtn');

    if (action) {
        addBtn.setAttribute('style', 'visibility : visible');
        removeBtn.setAttribute('style', 'visibility : hidden');
    }
    else {
        removeBtn.setAttribute('style', 'visibility : visible');
        addBtn.setAttribute('style', 'visibility : hidden');
    }

}

function addExcerptToMission() {
    $.ajax({
        type: "GET",
        url: "AddExcerptToMission",
        data: {
            excerptID: selectedID,
            missionID: missionID
        },
        success: function (response) {
            showAndDismissAlert("success", response);
            addSourceRow(selectedID, selectedText);
            loadResult();
            $(function () {
                $("#viewExcerpt").modal('hide');
            });
            loadSummary();
        }
    });



}
function removeExcerptFromMission() {
    $.ajax({
        type: "GET",
        url: "RemoveExcerptFromMission",
        data: {
            excerptID: selectedID,
            missionID: missionID
        },
        success: function (response) {
            showAndDismissAlert("success", response);
            removeSourceRow(selectedID);
            $(function () {
                $("#viewExcerpt").modal('hide');
            });
            loadSummary();
        }
    });

}

function loadSummary() {
    $.ajax({
        type: "GET",
        url: "GetExcerptOfMission",
        data: {
            missionID: missionID
        },
        success: function (responseJSON) {
            var political = 0, militarySecurity = 0, economic = 0, social = 0, information = 0, infrastructureTechnology = 0, environmentPhysical = 0;
            for (var x = 0; x < responseJSON.length; x++) {
                if (responseJSON[x].category === "political")
                    political += 1;
                else if (responseJSON[x].category === "military/security")
                    militarySecurity++;
                else if (responseJSON[x].category === "economic")
                    economic++;
                else if (responseJSON[x].category === "social")
                    social += 1;
                else if (responseJSON[x].category === "information")
                    information++;
                else if (responseJSON[x].category === "infrastructure and Technology")
                    infrastructureTechnology++;
                else if (responseJSON[x].category === "environment/phyiscal")
                    environmentPhysical++;
            }
            document.getElementById("political").innerHTML = political;
            document.getElementById("military-security").innerHTML = militarySecurity;
            document.getElementById("economic").innerHTML = economic;
            document.getElementById("social").innerHTML = social;
            document.getElementById("information").innerHTML = information;
            document.getElementById("infrastructure-technology").innerHTML = infrastructureTechnology;
            document.getElementById("environment-physical").innerHTML = environmentPhysical;
        }
    });
}


function saveDS() {
    $.ajax({
        type: "GET",
        url: "Save2DS",
        success: function (response) {
            showAndDismissAlert("success", "<strong>Data Sources</strong> have been <strong>saved.</strong>");
            setTimeout(function () {
                window.location.assign("ANMission3PCO?id=" + missionID)
            }, 3000);
        }
    });
}

