var srcJSON = [{"datePublish": "2010-01-01", "type": "Area Study", "name": "Davao del Sur Area Study 2010", "description": "Area study conducted on the Davao del Sur area by the 10th Infantry (AGILA) division", "id": "1"}];
function initialize() {
    showAndDismissAlert('success', 'Excerpts of <strong>' + srcJSON[0].name + '</strong>');

    var srcTable = document.getElementById('src-table');
    var excrTable = document.getElementById('src-excerpts');
    for (var x = 0; x < srcJSON.length; x++) {
        var row = srcTable.insertRow(x);
        var srcType = row.insertCell(0);
        srcType.innerHTML = srcJSON[x].type;
        var srcName = row.insertCell(1);
        srcName.innerHTML = srcJSON[x].name;
        var srcDesc = row.insertCell(2);
        srcDesc.innerHTML = srcJSON[x].description;
        var srcDatePub = row.insertCell(3);
        srcDatePub.innerHTML = srcJSON[x].datePublish;
    }
}

for (var x = 0; x < excrJSON.length; x++) {
    var row = excrTable.insertRow(x);
    row.setAttribute('onclick', "viewExcerpt(" + excrJSON[x].id + ")");
    row.setAttribute('class', 'active');
    row.setAttribute('data-toggle', 'modal');
    row.setAttribute('data-target', '#viewArtifact');
    row.setAttribute('style', 'cursor: pointer');
    var cell = row.insertCell(0);
    var h4 = document.createElement("h4");
    h4.innerHTML = "Excerpt " + excrJSON[x].id;
    cell.appendChild(h4);
    var p = document.createElement("p");
    p.innerHTML = excrJSON[x].text;
    cell.appendChild(p);
}


function viewExcerpt(id) {
    for (var x = 0; x < excrJSON.length; x++) {
        if (id == excrJSON[x].id) {

            document.getElementById('view-excerpttext').innerHTML = excrJSON[x].text;
            document.getElementById('category').innerHTML = excrJSON[x].categoryName;
            document.getElementById('source').innerHTML = srcJSON.name;
            document.getElementById('enter-tags').innerHTML = excrJSON[x].tags; //add TAGTEXT PLEASE DON'T FORGET DON'T
            document.getElementById('excerpt-num').innerHTML = "Excerpt " + excrJSON[x].id;
        }
    }
}

function saveExcerpt() {
    $.ajax({
        type: "GET",
        url: "SaveExcerpt",
        success: function (response) {
            $('#addExcerpt').modal('hide');
            showAndDismissAlert("success", response);
//            $.ajax({
//                type: "GET",
//                url: "GetSources",
//                success: function (response) {
//                    showAndDismissAlert("success", response);
//                    setTimeout(function () {
//                        window.location.assign("ANMission2DS")
//                    }, 3000);
//                }
//            });
        }
    });
}