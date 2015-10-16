//var entity = [{"id": 1, "name": "Intelligence", "excerpt": [{"id": 1, "text": "Fast internet connection"}, {"id": 2, "text": "Public library is open 24 hours"}], "type": null},
//    {"id": 2, "name": "Propaganda", "excerpt": [{"id": 3, "text": "Flyers against government officials are posted on streets"}, {"id": 4, "text": "Rallies against the government occur often"}], "type": null},
//    {"id": 3, "name": "Command and Control", "excerpt": [{"id": 5, "text": "Some police officers accept bribery"}, {"id": 6, "text": "Forces are not seen as authority"}], "type": null},
//    {"id": 4, "name": "Insurgent Operations", "excerpt": [{"id": 7, "text": "Patrols of the barangay are often made"}, {"id": 8, "text": "Insurgencies occur frequently"}], "type": null},
//    {"id": 5, "name": "Logistics", "excerpt": [{"id": 9, "text": "Delivery of raw materials occur at night"}, {"id": 2, "text": "Raw material deliveries are always late by 30 minutes"}], "type": null},
//    {"id": 6, "name": "Mobility", "excerpt": [{"id": 11, "text": "Government are not aware of the members of the threat organization"}, {"id": 12, "text": "Threat forces are assumed to have military trucks available to them"}], "type": null},
//    {"id": 7, "name": "Populace Cooperation", "excerpt": [{"id": 13, "text": "Population would not give out the members of the organization's names."}, {"id": 14, "text": "Population is slowly being swayed towards the threat's favor"}], "type": null},
//    {"id": 8, "name": "Leadership", "excerpt": [{"id": 15, "text": "Leader of the threat forces is known to be charismatic"}, {"id": 16, "text": "Leadership is passed down the family"}], "type": null},
//    {"id": 9, "name": "External Support", "excerpt": [{"id": 17, "text": "Threat forces seem to be getting funding from local businesses"}, {"id": 18, "text": "Threat forces never seem to lack funds"}], "type": null},
//    {"id": 10, "name": "Weapons", "excerpt": [{"id": 19, "text": "Forces possess military-grade weapons"}, {"id": 20, "text": "Majority of their bombs are not IED's but are legitimate bombs"}], "type": null},
//    {"id": 11, "name": "Communication Systems", "excerpt": [{"id": 21, "text": "Majority of the population use PLDT as an telecommunications company"}, {"id": 22, "text": "Majority of the population use Smart and Talk n' Text as a communication provider"}], "type": null},
//    {"id": 12, "name": "Ineffectual Government Security Forces", "excerpt": [{"id": 23, "text": "Government forces are seen as abusive in the area"}, {"id": 24, "text": "Government forces are known to be corrupt"}], "type": null},
//    {"id": 13, "name": "Insurgent Cell", "excerpt": [{"id": 25, "text": "The threat forces are seen as for the majority of the populace"}, {"id": 26, "text": "Threat forces have been present for half a century"}], "type": null},
//    {"id": 14, "name": "Threats and Coercion by Insurgents", "excerpt": [{"id": 27, "text": "A part of the public sees the forces as brutal"}, {"id": 28, "text": "Threat forces are prone to violence"}], "type": null},
//    {"id": 15, "name": "Distrust of Foreigners", "excerpt": [{"id": 29, "text": "Threat forces are known to target caucasian foreigners"}, {"id": 2, "text": "Caucasians are not encouraged to tour the area"}], "type": null},
//    {"id": 16, "name": "Monetary Rewards", "excerpt": [{"id": 31, "text": "Majority of the populace are poor"}, {"id": 32, "text": "Populace is desperate for money"}], "type": null},
//    {"id": 17, "name": "Perception of Government as Public Regime", "excerpt": [{"id": 33, "text": "The public believes that the local government is being controlled"}, {"id": 34, "text": "The area was brutally affected during the Marcos rule"}], "type": null},
//    {"id": 18, "name": "Will to resist Against Government", "excerpt": [{"id": 35, "text": "Government has been wearing down the populace with charity work"}, {"id": 36, "text": "Government has been increasing donations to charities"}], "type": null},
//    {"id": 19, "name": "Political and Economic Strife", "excerpt": [{"id": 31, "text": "Majority of the populace are poor"}, {"id": 2, "text": "Political Dynasties are present in the area"}], "type": null}];

function initialize() {
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
            console.log(entity);
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
        nodes.add([{id: entity[x].id, label: entity[x].name, group: entity[x].class}]);
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

    //get CCs for TCOA
    var ccArr = nodes.get({
        filter: function (items) {
            return (items.group == 3);
        }
    });
    //get CR and CVs connected to it
    var cr = nodes.get({
        filter: function (items) {
            return (items.group == 4);
        }
    });
    var crArr = [];
    for (var x = 0; x < cr.length; x++) {
        var crConnected = network.getConnectedNodes(cr[x].id);
        var cvConnectedToCr = [];
        var ccConnectedToCr = [];
        if (crConnected != null) {
            for (var y = 0; y < crConnected.length; y++) {
                if (nodes.get(crConnected[y]).group === 5) {
                    cvConnectedToCr.push(nodes.get(crConnected[y]));
                }
                if (nodes.get(crConnected[y]).group === 3) {
                    ccConnectedToCr.push(nodes.get(crConnected[y]));
                }
            }
        }
        if (cvConnectedToCr.length > 0) {
            var crObject = {cr: cr[x], cc: ccConnectedToCr, cv: cvConnectedToCr};
            crArr.push(crObject);
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
            missionID: missionID,
            missionNodes: nodesJSON,
            missionEdges: edgesJSON,
            missionTCOA: toJSON(ccArr), //list of cc objects {id, name, class NOT group
            missionCARVER: toJSON(crArr) //list of cr object {id, name, class, cvarray}
        },
        success: function (response) {
            showAndDismissAlert("success", "<strong>Center of Gravity Analysis</strong> has been <strong>saved.</strong>");
            setTimeout(function () {
                window.location.assign("ANMission4TCOA")
            }, 3000);
        }
    });

}

function loadSideBar() {
    var table = document.getElementById("entity-table");

    for (var x = 0; x < entity.length; x++) {
        var trEntity = document.createElement("tr");
        trEntity.innerHTML = "<h5><b>" + entity[x].name + "</b></h5>";
        trEntity.style.borderBottom = "solid 1px #D3D3D3";
        trEntity.style.padding = "5px";
        trEntity.style.margin = "10px";
        if (entity[x].excrList.length != 0) {
            for (var y = 0; y < entity[x].excrList.length; y++) {
                var trExcerpt = document.createElement("tr");
                var tdExcerpt = document.createElement("td");
                tdExcerpt.style.paddingLeft = "25px";
                tdExcerpt.style.paddingBottom = "5px";
                tdExcerpt.style.color = "#202020";
                tdExcerpt.innerHTML = "<b>Excerpt " + entity[x].excrList[y].id + ":</b> " + entity[x].excrList[y].text;
                trExcerpt.appendChild(tdExcerpt);
                trEntity.appendChild(trExcerpt);
            }
        }
        table.appendChild(trEntity);
    }
}