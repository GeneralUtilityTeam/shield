var infrJSON;
var scndJSON;
var cartJSON = [];

function initialize() { //Change this to take entities
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
        var tr = document.createElement("tr");
        tr.style.borderBottom = "solid 1px #DDDDDD";
        var td1 = document.createElement("td");
        td1.setAttribute('width', '90%');
        td1.setAttribute('data-toggle', 'modal');
        td1.setAttribute('data-target', '#viewExcerpt');
        td1.setAttribute('onclick', 'loadExcerpt(' + infrJSON[x].id + ')');
        td1.style.padding = "0 1vw 0 1vw";
        var excrText = infrJSON[x].text;
        td1.innerHTML = "<h4> Excerpt - " + infrJSON[x].id + " </h4><p>" + excrText + "</p><div class='progress'><div class='progress-bar " + defineProgressBar(infrJSON[x].strength) + "' role='progressbar' aria-valuemin='0' aria-valuemax='100' style='width: " + infrJSON[x].strength + "%;'>" + infrJSON[x].strength + "% Relevance </div> </div>";

        //Column for Add/Remove
        var td2 = document.createElement("td");
        td2.id = "cell" + x;
        //Button for Add/Remove
        var btn = document.createElement("button");
        btn.id = "button" + x;
        //Span for Add/Remove
        var span = document.createElement("span");
        span.id = "span" + x;
        if (cartJSON.length != 0) {
            for (var y = 0; y < cartJSON.length; y++) {
                if (cartJSON[y].id === infrJSON[x].id) {
                    btn.className = "btn btn-sm btn-danger";
                    btn.setAttribute("onclick", "addRemove(" + x + ")");
                    span.className = "glyphicon glyphicon-minus";
                }
                else {
                    btn.className = "btn btn-sm btn-success";
                    btn.setAttribute("onclick", "addRemove(" + x + ")");
                    span.className = "glyphicon glyphicon-plus";
                }
            }
        }
        else {
            btn.className = "btn btn-sm btn-success";
            btn.setAttribute("onclick", "addRemove(" + x + ")");
            span.className = "glyphicon glyphicon-plus";
        }
        btn.appendChild(span);
        td2.appendChild(btn);
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
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
            document.getElementById('viewArea').innerHTML = generateFullAddress(responseJSON);
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

    var political = 0, militarySecurity = 0, economic = 0, social = 0, information = 0, infrastructureTechnology = 0, environmentPhysical = 0;
    for (var x = 0; x < cartJSON.length; x++) {
        if (cartJSON[x].category === "political")
            political++;
        else if (cartJSON[x].category === "military/security")
            militarySecurity++;
        else if (cartJSON[x].category === "economic")
            economic++;
        else if (cartJSON[x].category === "social")
            social++;
        else if (cartJSON[x].category === "information")
            information++;
        else if (cartJSON[x].category === "infrastructure and Technology")
            infrastructureTechnology++;
        else if (cartJSON[x].category === "environment/phyiscal")
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
function addRemove(id) {
    var btn = document.getElementById("button" + id);
    var span = document.getElementById("span" + id);
    var found = false;
    for (var i = 0; i < cartJSON.length; i++) {
        if (cartJSON[i].id == id + 1) {
            btn.className = "btn btn-sm btn-success";
            btn.setAttribute("onclick", "addRemove(" + id + ")");
            span.className = "glyphicon glyphicon-plus";
            cartJSON.splice(i, 1);
            loadSummary();
            found = true;
            break;
        }
    }
    if (!found) {
        btn.className = "btn btn-sm btn-danger";
        btn.setAttribute("onclick", "addRemove(" + id + ")");
        span.className = "glyphicon glyphicon-minus";
        for (var x = 0; x < infrJSON.length; x++) {
            if (infrJSON[x].id == id + 1) {
                cartJSON.splice(cartJSON.length, 0, infrJSON[x]);
                loadSummary();
            }
        }
    }
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

