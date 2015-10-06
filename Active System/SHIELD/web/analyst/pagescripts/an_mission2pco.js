var infrJSON;
var scndJSON;
var cartList = [];

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

function addRelatedRow(relatedExcerpts) {
    var table = document.getElementById("related-table");
    table.innerHTML = "";
    for (var x = 0; x < relatedExcerpts.length; x++) {
        var row = table.insertRow(x);
        row.setAttribute('onclick', 'loadExcerpt(' + relatedExcerpts[x].id + ')');
        row.style.cursor = "pointer";
        row.style.borderBottom = "1px solid #DDDDDD";
        table.appendChild(row);
        var cell = row.insertCell(0);
        cell.innerHTML = "<h5><b>Excerpt " + relatedExcerpts[x].id + "</b></h5><p>" + relatedExcerpts[x].text + "</p>";
    }
}


function removeSourceRow(id) {
    var row = document.getElementById("sourceRow" + id);
    row.parentNode.removeChild(row);
}

function loadResult() {
    var table = document.getElementById('result-table');
    table.innerHTML = "";
    for (var x = 0; x < infrJSON.length; x++) {
        var row = table.insertRow(x);
        row.setAttribute('data-toggle', 'modal');
        row.setAttribute('data-target', '#viewExcerpt');
        row.setAttribute('onclick', 'loadExcerpt(' + infrJSON[x].id + ')');
        var cell = row.insertCell(0);
        var excrText = infrJSON[x].text;
        var excerptStatus;
        if (infrJSON[x].status === 1)
            excerptStatus = "glyphicon-minus";
        else {
            excerptStatus = "glyphicon-plus";
        }
        cell.innerHTML = "<h4> Excerpt - " + infrJSON[x].id + " </h4><p>" + excrText + "</p><div class='progress'><div class='progress-bar " + defineProgressBar(infrJSON[x].strength) + "' role='progressbar' aria-valuemin='0' aria-valuemax='100' style='width: " + infrJSON[x].strength + "%;'>" + infrJSON[x].strength + "% Relevance </div> </div>";
        var cell2 = row.insertCell(1);
        cell2.innerHTML = "<button type='button' onclick='addToPCO(" + infrJSON[x].id + ")' class='btn btn-sm btn-default'><span class='glyphicon " + excerptStatus + "'></span> </button>";
    }
}

function loadExcerpt(id) {
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
            document.getElementById('viewCategory').innerHTML = responseJSON.category;
            document.getElementById('viewSource').innerHTML = responseJSON.source;
            var viewTags = $('#viewTags');
            viewTags.tagsinput('removeAll');
            for (var x = 0; x < responseJSON.tags.length; x++) {
                viewTags.tagsinput('add', responseJSON.tags[x]);
            }
            document.getElementById("related-table").innerHTML = "";
            $.ajax({
                type: "GET",
                url: "SecondaryExcerptSearch",
                data: {
                    param: responseJSON.id
                },
                success: function (relatedJSON) {
                    addRelatedRow(relatedJSON);
                }
            });
            loadResult();
        }
    });

    modal.setAttribute('style', 'visibility : visible');

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

function defineProgressBar(strength) {
    var progressBar;
    if (strength <= 25) {
        return progressBar = "progress-bar-danger";
    }
    else if (strength <= 50 && strength > 25) {
        return progressBar = "progress-bar-warning";
    }
    else if (strength <= 75 && strength > 50) {
        return progressBar = "progress-bar-info";
    }
    else if (strength <= 100 && strength > 75) {
        return progressBar = "progress-bar-success";
    }
}

function addToPCO(excerpt) {
    alert(excerpt);
}

function savePCO() {
    $.ajax({
        type: "GET",
        url: "Save2PCO",
        success: function (response) {
            showAndDismissAlert("success", "<strong>Characteristics Overlay</strong> has been <strong>saved.</strong>");
            setTimeout(function () {
                window.location.assign("ANMission3COG?id=" + missionID)
            }, 3000);
        }
    });
}

