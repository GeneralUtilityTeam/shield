function initialize() {
    //replace first parameter with Mission Status - msonJSOB.status
    buildNav(msonStatus, 3);
    draw();
}

var network, nodes, edges;

var options = {
    manipulation: {
        addNode: function (data, callback) {
            // filling in the popup DOM elements
            document.getElementById('operation').innerHTML = "Add Node";
            document.getElementById('node-id').value = data.id;
            document.getElementById('node-label').value = data.label;
            document.getElementById('node-group').value = data.group;
            document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
            document.getElementById('cancelButton').onclick = clearPopUp.bind();
            document.getElementById('network-popUp').style.display = 'block';
        },
        editNode: function (data, callback) {
            // filling in the popup DOM elements
            document.getElementById('operation').innerHTML = "Edit Node";
            document.getElementById('node-id').value = data.id;
            document.getElementById('node-label').value = data.label;
            document.getElementById('node-group').value = data.group;
            document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
            document.getElementById('cancelButton').onclick = cancelEdit.bind(this, callback);
            document.getElementById('network-popUp').style.display = 'block';
        },
        addEdge: function (data, callback) {
            var x = nodes.get(data.from);
            var y = nodes.get(data.to);
            if (x.group == y.group) {
                showAndDismissAlert("danger", "You cannot connect the <strong>node to itself</strong>.");
                end();
            }
            if (
                    (x.group == "cog" && y.group == "cr") ||
                    (x.group == "cr" && y.group == "cog") ||
                    (x.group == "cog" && y.group == "cv") ||
                    (x.group == "cv" && y.group == "cog") ||
                    (x.group == "cc" && y.group == "cv") ||
                    (x.group == "cv" && y.group == "cc")
                    ) {
                showAndDismissAlert("danger", "You cannot connect <strong>" + x.group.toUpperCase() + "</strong> to <strong>" + y.group.toUpperCase() + "</strong>.");
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
        cog: {
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf21e',
                size: 50,
                color: '#CC0000'
            }
        },
        cc: {
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf1e2',
                size: 30,
                color: '#202020'
            }
        },
        cr: {
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf06a',
                size: 30,
                color: '#FF4500'
            }
        },
        cv: {
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
    //for COG already created
    if (msonStatus > 4) {
        $.ajax({
            type: "GET",
            url: "GetMissionNodes",
            data: {
                missionID: missionID
            },
            success: function (missionNodes) {
                for (var x = 0; x < missionNodes.length; x++) {
                    nodes.add(missionNodes[x]);
                }
            }
        });
        $.ajax({
            type: "GET",
            url: "GetMissionEdges",
            data: {
                missionID: missionID
            },
            success: function (missionEdges) {
                for (var x = 0; x < missionEdges.length; x++) {
                    edges.add(missionEdges[x]);
                }
            }
        });
    }
    //for COG created from PCO labels
    else if (msonStatus == "4" && missionLabels != null) {
        for (var x = 0; x < missionLabels.length; x++) {
            var newId = (Math.random() * 1e7).toString(32);
            nodes.add({id: newId, label: missionLabels[x], group: ""});
        }
    }

    var data = {
        nodes: nodes,
        edges: edges
    };

    network = new vis.Network(container, data, options);

}
function clearAll() {
    nodes.clear();
    edges.clear();
    draw();
}
function addNode(addGroup) {
    var nodeGroup = addGroup;
    var newId = (Math.random() * 1e7).toString(32);
    nodes.add({id: newId, label: "new", group: nodeGroup});
}

//Standard functions
function clearPopUp() {
    document.getElementById('saveButton').onclick = null;
    document.getElementById('cancelButton').onclick = null;
    document.getElementById('network-popUp').style.display = 'none';
}

function cancelEdit(callback) {
    clearPopUp();
    callback(null);
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
    
    //get CR and CVs connected to it
    var cr = nodes.get({
        filter: function (items) {
            return (items.group == "cr");
        }
    });
    for (var x = 0; x < cr.length; x++) {
        var crConnected = network.getConnectedNodes(cr[x].id);
        var cvConnectedToCr = [];
        if (crConnected != null) {
            for (var y = 0; y < crConnected.length; y++) {
                if (nodes.get(crConnected[y]).group === "cv") {
                    cvConnectedToCr.push(nodes.get(crConnected[y]));
                }
            }
        }
        $.ajax({
            type: "GET",
            url: "CreateCarverMatrix",
            data: {
                missionID: missionID,
                cr: cr[x].id,
                cv: cvConnectedToCr
            }
        });
    }

    //Save Nodes and Edges
    var saveNodes = nodes.get({
        fields: ['id', 'label', 'group'],
        type: {
            group: 'String'                 // convert the group fields to Strings
        }
    });
    var saveEdges = edges.get();
    var nodesJSON = JSON.stringify(saveNodes);
    var edgesJSON = JSON.stringify(saveEdges);

    $.ajax({
        type: "GET",
        url: "Save3COG",
        data: {
            missionID: missionID,
            missionNodes: nodesJSON,
            missionEdges: edgesJSON
        },
        success: function (response) {
            showAndDismissAlert("success", "<strong>Center of Gravity Analysis</strong> has been <strong>saved.</strong>");
            setTimeout(function () {
                window.location.assign("ANMission4TCOA")
            }, 3000);
        }
    });
 
}




