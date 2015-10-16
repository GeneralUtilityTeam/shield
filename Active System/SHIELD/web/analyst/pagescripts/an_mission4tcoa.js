var entity;
var entityCC = [];
function initialize() {
    //replace first parameter with Mission Status - msonJSOB.status
    //buildNav(4, 4);

    $.ajax({
        type: "GET",
        url: "GetEEntityOfMission",
        data: {
            missionID: missionID

        },
        success: function (responseJSON) {
            entity = responseJSON;
            initialize();
        }
    });

    for (var x = 0; x < entity.length; x++) {
        if (entity[x].class == 3)
            entityCC.push(entity[x]);
    }

    var collapse = document.getElementById("accordion");
    for (var x = 0; x < entityCC.length; x++) {
        //Panel Element
        var panel = document.createElement("div");
        panel.className = "panel panel-default";
        panel.id = "panel" + x;

        //Panel Header
        var panelHead = document.createElement("div");
        panelHead.className = "panel-heading";
        panelHead.id = "panelHead" + x;
        panelHead.setAttribute("data-toggle", "collapse");
        panelHead.setAttribute("href", "#collapse" + x);
        panelHead.innerHTML = "<h5>Critical Capability " + (x + 1) + ": <b>" + entityCC[x].name + "</b></h5>";

        //Panel Collapse
        var panelCollapse = document.createElement("div");
        panelCollapse.className = "panel-collapse collapse in";
        panelCollapse.id = "collapse" + x;

        //Panel Body
        var panelBody = document.createElement("div");
        panelBody.className = "panel-body";
        panelBody.id = "panelBody" + x;
        panelBody.innerHTML = "<p> Threat may launch/use/deploy <b>" + entityCC[x].name + "</b></p>";
        panelBody.innerHTML += " from: <input type='date' onchange='to" + x + ".focus()' id='from" + x + "' class='form-box' style='width:42%;'> to: <input type='date' onchange='from" + (x + 1) + ".focus()' id='to" + x + "' class='form-box' style='width:42%;'>";

        panelCollapse.appendChild(panelBody);
        panel.appendChild(panelHead);
        panel.appendChild(panelCollapse);
        collapse.appendChild(panel);

    }
}


function saveTCOA() {
    var proceed = true;

    for (var x = 0; x < entityCC.length; x++) {
        var from = document.getElementById("from" + x).value;
        var to = document.getElementById("to" + x).value;
        if (from == "") {
            showAndDismissAlert("danger", "Please input <strong> from </strong> date in <strong> Critical Capability " + (x + 1) + "</strong>");
            proceed = false;
        }
        if (to == "") {
            showAndDismissAlert("danger", "Please input <strong> to </strong> date in <strong> Critical Capability " + (x + 1) + "</strong>");
            proceed = false;
        }
        if (from > to) {
            showAndDismissAlert("danger", "Invalid input for <strong> Critical Capability " + (x + 1) + "</strong>");
            proceed = false;
        }
    }

    if (proceed) {
        for (var x = 0; x < entity.length; x++) {
            for (var y = 0; y < entityCC.length; y++) {
                if (entity[x].id == entity[y].id) {
                    entity[x].from = document.getElementById("from" + y).value;
                    entity[x].to = document.getElementById("to" + y).value;
                }
            }
        }

        $.ajax({
            type: "GET",
            url: "Save4TCOA",
            data: {
                missionID: missionID,
                entityArr: toJSON(entity)
            },
            success: function (response) {
                showAndDismissAlert("success", "<strong>Threat Course of Action</strong> has been <strong>saved.</strong>");
                setTimeout(function () {
                    window.location.assign("ANMission5CM")
                }, 3000);
            }
        });
    }

}