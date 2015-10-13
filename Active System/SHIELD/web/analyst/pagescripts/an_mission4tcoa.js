var entity = [{"id": 1, "name": "Intelligence", "excerpt": [{"id": 1, "text": "Fast internet connection"}, {"id": 2, "text": "Public library is open 24 hours"}], "type": null},
    {"id": 2, "name": "Propaganda", "excerpt": [{"id": 3, "text": "Flyers against government officials are posted on streets"}, {"id": 4, "text": "Rallies against the government occur often"}], "type": null},
    {"id": 3, "name": "Command and Control", "excerpt": [{"id": 5, "text": "Some police officers accept bribery"}, {"id": 6, "text": "Forces are not seen as authority"}], "type": null},
    {"id": 4, "name": "Insurgent Operations", "excerpt": [{"id": 7, "text": "Patrols of the barangay are often made"}, {"id": 8, "text": "Insurgencies occur frequently"}], "type": null},
    {"id": 5, "name": "Logistics", "excerpt": [{"id": 9, "text": "Delivery of raw materials occur at night"}, {"id": 2, "text": "Raw material deliveries are always late by 30 minutes"}], "type": "cc"},
    {"id": 6, "name": "Mobility", "excerpt": [{"id": 11, "text": "Government are not aware of the members of the threat organization"}, {"id": 12, "text": "Threat forces are assumed to have military trucks available to them"}], "type": null},
    {"id": 7, "name": "Populace Cooperation", "excerpt": [{"id": 13, "text": "Population would not give out the members of the organization's names."}, {"id": 14, "text": "Population is slowly being swayed towards the threat's favor"}], "type": null},
    {"id": 8, "name": "Leadership", "excerpt": [{"id": 15, "text": "Leader of the threat forces is known to be charismatic"}, {"id": 16, "text": "Leadership is passed down the family"}], "type": null},
    {"id": 9, "name": "External Support", "excerpt": [{"id": 17, "text": "Threat forces seem to be getting funding from local businesses"}, {"id": 18, "text": "Threat forces never seem to lack funds"}], "type": "cc"},
    {"id": 10, "name": "Weapons", "excerpt": [{"id": 19, "text": "Forces possess military-grade weapons"}, {"id": 20, "text": "Majority of their bombs are not IED's but are legitimate bombs"}], "type": null},
    {"id": 11, "name": "Communication Systems", "excerpt": [{"id": 21, "text": "Majority of the population use PLDT as an telecommunications company"}, {"id": 22, "text": "Majority of the population use Smart and Talk n' Text as a communication provider"}], "type": null},
    {"id": 12, "name": "Ineffectual Government Security Forces", "excerpt": [{"id": 23, "text": "Government forces are seen as abusive in the area"}, {"id": 24, "text": "Government forces are known to be corrupt"}], "type": null},
    {"id": 13, "name": "Insurgent Cell", "excerpt": [{"id": 25, "text": "The threat forces are seen as for the majority of the populace"}, {"id": 26, "text": "Threat forces have been present for half a century"}], "type": null},
    {"id": 14, "name": "Threats and Coercion by Insurgents", "excerpt": [{"id": 27, "text": "A part of the public sees the forces as brutal"}, {"id": 28, "text": "Threat forces are prone to violence"}], "type": null},
    {"id": 15, "name": "Distrust of Foreigners", "excerpt": [{"id": 29, "text": "Threat forces are known to target caucasian foreigners"}, {"id": 2, "text": "Caucasians are not encouraged to tour the area"}], "type": null},
    {"id": 16, "name": "Monetary Rewards", "excerpt": [{"id": 31, "text": "Majority of the populace are poor"}, {"id": 32, "text": "Populace is desperate for money"}], "type": "cc"},
    {"id": 17, "name": "Perception of Government as Public Regime", "excerpt": [{"id": 33, "text": "The public believes that the local government is being controlled"}, {"id": 34, "text": "The area was brutally affected during the Marcos rule"}], "type": null},
    {"id": 18, "name": "Will to resist Against Government", "excerpt": [{"id": 35, "text": "Government has been wearing down the populace with charity work"}, {"id": 36, "text": "Government has been increasing donations to charities"}], "type": null},
    {"id": 19, "name": "Political and Economic Strife", "excerpt": [{"id": 31, "text": "Majority of the populace are poor"}, {"id": 2, "text": "Political Dynasties are present in the area"}], "type": "cc"}];
var entityCC = [];
function initialize() {
    //replace first parameter with Mission Status - msonJSOB.status
    //buildNav(4, 4);
    
    for(var x=0; x<entity.length; x++){
        if(entity[x].type == "cc")
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
        panelBody.innerHTML += " from: <input type='date' onchange='to" + x + ".focus()' id='from" + x + "' class='form-box' style='width:42%;'> to: <input type='date' onchange='from" + (x+1) + ".focus()' id='to" + x + "' class='form-box' style='width:42%;'>";

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
        for(var x=0; x<entity.length; x++){
            for(var y=0; y<entityCC.length; y++){
                if(entity[x].id == entity[y].id){
                    entity[x].from = document.getElementById("from" + y).value;
                    entity[x].to = document.getElementById("to" + y).value;
                }
            }
        }
        
        //Call AJAX here
    }

}