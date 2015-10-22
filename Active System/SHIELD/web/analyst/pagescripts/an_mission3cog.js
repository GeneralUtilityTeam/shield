function initialize() {
    document.getElementById("global-username").innerHTML = userFullName + " ";
    buildNav(missionStatus, 3);
    //for COG already created
    if (missionStatus > 3) {
        if (nodesArray != null) {
            for (var x = 0; x < nodesArray.length; x++) {
                nodes.add(nodesArray[x]);
            }
        }
        if (edgesArray != null) {
            for (var x = 0; x < edgesArray.length; x++) {
                edges.add(edgesArray[x]);
            }
        }
        draw();
    }
    //for COG created from PCO entities
    else if (missionStatus == 3 && entity != null) {
        createNodes();
    }

    loadSideBar();

}

$(document).ready(function () {
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
});

var network, nodes, edges, activeId, activeNode;

var options = {
    manipulation: {
        addNode: false,
        addEdge: function (data, callback) {
            var x = nodes.get(data.from);
            var y = nodes.get(data.to);
            if (x.group == y.group) {
                showAndDismissAlert("danger", "You cannot connect the <strong>node to itself</strong>.");
                end();
            }
            if (
                    (x.group == 2 && y.group == 4) ||
                    (x.group == 4 && y.group == 2) ||
                    (x.group == 2 && y.group == 5) ||
                    (x.group == 5 && y.group == 2) ||
                    (x.group == 3 && y.group == 5) ||
                    (x.group == 5 && y.group == 3)
                    ) {
                showAndDismissAlert("danger", "You cannot connect these nodes.");
            }

            else {
                callback(data);
            }
        }
    },
    nodes: {
        shape: 'dot',
        size: 15,
        color: 'black',
        font: {
            size: 15,
            color: 'black'
        },
        borderWidth: 2
    },
    edges: {
        width: 2,
        color: '#202020'
    },
    groups: {
        2: {
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf192',
                size: 50,
                color: '#CC0000'
            }
        },
        3: {
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf1e2',
                size: 30,
                color: '#202020'
            }
        },
        4: {
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf06a',
                size: 30,
                color: '#FF4500'
            }
        },
        5: {
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf13e',
                size: 30,
                color: '#DAA520'
            }
        }
    }
};
var nodesArray, edgesArray;
nodes = new vis.DataSet();
edges = new vis.DataSet();


//Custom functions
function draw() {
    // create a network   
    var container = document.getElementById('mynetwork');

    var data = {
        nodes: nodes,
        edges: edges
    };

    network = new vis.Network(container, data, options);

}

function createNodes() {
    nodes.clear();
    edges.clear();
    for (var x = 0; x < entity.length; x++) {
        nodes.add([{id: entity[x].id, label: entity[x].name, group: entity[x].classID}]);
    }

    var cc = nodes.get({
        filter: function (items) {
            return (items.group == 3);
        }
    });
    var cog = nodes.get({
        filter: function (items) {
            return (items.group == 2);
        }
    });

    for (var x = 0; x < cc.length; x++) {
        var newId = (Math.random() * 1e7).toString(32);
        edges.add([{id: newId, from: cc[x].id, to: cog[0].id}]);
    }
    draw();
}

function saveData(data, callback) {
    data.id = document.getElementById('node-id').value;
    data.label = document.getElementById('node-label').value;
    data.group = document.getElementById('node-group').value;
    clearPopUp();
    callback(data);
    nodes.update([{id: data.id, label: data.label, group: data.group}]);
}

function saveCOG() {
    var proceed = true;
    for (var x = 0; x < entity.length; x++) {
        var node = nodes.get(entity[x].id);
        var connected = network.getConnectedNodes(node.id);
        if (connected.length == 0) {
            proceed = false;
            showAndDismissAlert("danger", "Please connect <strong>" + node.label + "</strong> to other <strong>Entities.</strong>");
        }
    }

    if (proceed) {

        //get CR and CVs connected to it
        var tempCc = nodes.get({
            filter: function (items) {
                return (items.group == 3);
            }
        });
        var cc = [];
        for (var x = 0; x < tempCc.length; x++) {
            cc.push(tempCc[x].id);
        }
        var tempCr = nodes.get({
            filter: function (items) {
                return (items.group == 4);
            }
        });
        var cr = [];
        for (var x = 0; x < tempCr.length; x++) {
            cr.push(tempCr[x].id);
        }
        var tempCv = nodes.get({
            filter: function (items) {
                return (items.group == 5);
            }
        });
        var cv = [];
        for (var x = 0; x < tempCv.length; x++) {
            cv.push(tempCv[x].id);
        }
        var ccArr = [];
        for (var x = 0; x < tempCc.length; x++) {
            var ccConnected = network.getConnectedNodes(tempCc[x].id);
            if (ccConnected != null) {
                for (var y = 0; y < ccConnected.length; y++) {
                    if (nodes.get(ccConnected[y]).group == 4) {
                        var ccObject = {cc: tempCc[x].id, cr: ccConnected[y]};
                        ccArr.push(ccObject);
                    }
                }
            }
        }
        var crArr = [];
        for (var x = 0; x < tempCr.length; x++) {
            var crConnected = network.getConnectedNodes(tempCr[x].id);
            if (crConnected != null) {
                for (var y = 0; y < crConnected.length; y++) {
                    if (nodes.get(crConnected[y]).group == 5) {
                        var crObject = {cr: tempCr[x].id, cv: crConnected[y]};
                        crArr.push(crObject);
                    }
                }
            }
        }
        //Save Nodes and Edges
        var saveNodes = nodes.get({
            fields: ['id', 'label', 'group']
        });
        var saveEdges = edges.get();
        var nodesJSON = JSON.stringify(saveNodes);
        var edgesJSON = JSON.stringify(saveEdges);

        $.ajax({
            type: "GET",
            url: "Save3COG",
            data: {
                nodesJSON: nodesJSON,
                edgesJSON: edgesJSON,
                cc: toJSON(cc),
                cr: toJSON(cr),
                cv: toJSON(cv),
                crArr: toJSON(ccArr),
                rvArr: toJSON(crArr) //list of cr object {id, name, class, cvarray}
            },
            success: function (response) {
                showAndDismissAlert("success", "<strong>Center of Gravity Analysis</strong> has been <strong>saved.</strong>");
                setTimeout(window.location.assign("ANMission4TCOA"), 3000);
            }
        });
    }
}

function loadSideBar() {
    var collapse = $('#accordion');
    collapse.empty();
    collapse.add("<h5 style='text-align:center;'>Mission Entities</h5>");

    for (var x = 0; x < entity.length; x++) {
        //Panel Element
        var panel = document.createElement("div");
        panel.className = "panel panel-default";
        panel.id = "panel" + x;

        var classType = "";
        if (entity[x].classID == 2)
            classType = "Center of Gravity";
        else if (entity[x].classID == 3)
            classType = "Critical Capability";
        else if (entity[x].classID == 4)
            classType = "Critical Requirement";
        else if (entity[x].classID == 5)
            classType = "Critical Vulnerability";

        //Panel Header
        var panelHead = document.createElement("div");
        panelHead.className = "panel-heading";
        panelHead.id = "panelHead" + x;
        panelHead.setAttribute("data-toggle", "collapse");
        panelHead.setAttribute("href", "#collapse" + x);
        panelHead.innerHTML = "<h5><b>" + toTitleCase(entity[x].name) + "</b> - " + classType + "</h5>";

        //Panel Collapse
        var panelCollapse = document.createElement("div");
        panelCollapse.className = "panel-collapse collapse";
        panelCollapse.id = "collapse" + x;

        //Panel Body
        var panelBody = document.createElement("div");
        panelBody.className = "panel-body";
        panelBody.id = "panelBody" + x;
        var table = document.createElement("table");
        for (var y = 0; y < entity[x].excrList.length; y++) {
            var trExcerpt = document.createElement("tr");
            var tdExcerpt = document.createElement("td");
            tdExcerpt.style.paddingBottom = "5px";
            tdExcerpt.style.color = "#202020";
            tdExcerpt.style.textAlign = "justify";
            tdExcerpt.innerHTML = "<b>Excerpt " + entity[x].excrList[y].id + ":</b> " + entity[x].excrList[y].text;
            trExcerpt.appendChild(tdExcerpt);
            table.appendChild(trExcerpt);
        }

        panelBody.appendChild(table);
        panelCollapse.appendChild(panelBody);
        panel.appendChild(panelHead);
        panel.appendChild(panelCollapse);
        collapse.append(panel);

    }
}