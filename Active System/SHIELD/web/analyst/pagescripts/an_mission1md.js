function initialize() {
    buildNav(msonJSOB.status, 1);
    if (msonJSOB.title != 'undefined')
        document.getElementById('mission-title').value = msonJSOB.title;
    if (msonJSOB.area != null) {
        document.getElementById('mission-address').value = generateFullAddress(msonJSOB.area);
    }
    if (msonJSOB.objective != null)
        document.getElementById('mission-objective').innerHTML = msonJSOB.objective;
    if (msonJSOB.commanderIntent != null)
        document.getElementById('commander-intent').innerHTML = msonJSOB.commanderIntent;
    if (msonJSOB.conceptOfOperation != null)
        document.getElementById('concept-of-operation').innerHTML = msonJSOB.conceptOfOperation;
    if (msonJSOB.themeStress != null)
        document.getElementById('theme-stress').innerHTML = msonJSOB.themeStress;
    if (msonJSOB.themeAvoid != null)
        document.getElementById('theme-avoid').innerHTML = msonJSOB.themeAvoid;
    if (msonJSOB.situation != null)
        document.getElementById('mission-situation').innerHTML = msonJSOB.situation;
    if (msonJSOB.taskList != null) {
        for (var x = 0; x < msonJSOB.taskList.length; x++) {
            addTask(msonJSOB.taskList[x].psyopsElement, msonJSOB.taskList[x].desc);
        }
    }
}
var taskCount = 0;
function addTask(psyopElement, text) {
    var taskSection = document.getElementById("task-table");
    var row = document.createElement("tr");
    var cell = row.insertCell(0);
    var elementArea = document.createElement('textarea');
    elementArea.id = "element" + taskCount;
    elementArea.setAttribute("type", "text");
    elementArea.setAttribute("class", "form-box");
    elementArea.setAttribute("rows", 4);
    elementArea.setAttribute("cols", 50);
    elementArea.setAttribute("placeholder", "PSYOP Element");
    elementArea.setAttribute("name", "element" + taskSection.rows.length);
    elementArea.setAttribute("style", "margin-top: 5px; margin-bottom: 5px; width: 20%; resize: none; height: 7vh;");
    elementArea.innerHTML = psyopElement;
    cell.appendChild(elementArea);
    var taskArea = document.createElement('textarea');
    taskArea.id = "task" + taskCount;
    taskArea.setAttribute("type", "text;");
    taskArea.setAttribute("class", "form-box");
    taskArea.setAttribute("rows", 4);
    taskArea.setAttribute("cols", 50);
    taskArea.setAttribute("placeholder", "Task");
    taskArea.setAttribute("name", "task" + taskSection.rows.length);
    taskArea.setAttribute("style", "margin-top: 5px; margin-bottom: 5px; width: 80%; resize: none; height: 7vh;");
    taskArea.innerHTML = text;
    cell.appendChild(taskArea);
    taskSection.appendChild(row);
    $('html, body').scrollTop($(document).height());
    taskCount++;
    
}
function saveTask(){
    var taskList = [];
    for(var x=0; x< taskCount; x++){
        var taskObject;
        var psyopsElement = document.getElementById("element" + x).value;
        var task = document.getElementById("task" + x).value;
        if(psyopsElement != "" && task != ""){
            taskObject = {"psyopsElement": psyopsElement, "desc": task};
            taskList.push(taskObject);
        }
    }
    return taskList;
    
}

function saveMD() {
    var missionTitle = document.getElementById("mission-title").value;
    var missionObjective = document.getElementById("mission-objective").value;
    var missionSituation = document.getElementById("mission-situation").value;
    var commanderIntent = document.getElementById("commander-intent").value;
    var conceptOfOperation = document.getElementById("concept-of-operation").value;
    var themeStress = document.getElementById("theme-stress").value;
    var themeAvoid = document.getElementById("theme-avoid").value;
    var taskList = saveTask();
    //Please create variable for Task

    if (missionTitle === "" ||  missionObjective === "" ||
            missionSituation === "" || commanderIntent === "" || conceptOfOperation === "" ||
            themeStress === "" || themeAvoid === "") {
        showAndDismissAlert("danger", "<strong>Save Mission Details failed.</strong> Please complete the form.");
    }
    else {
        $.ajax({
            type: "GET",
            url: "Save1MD",
            data: {
                id: msonJSOB.id,
                title: missionTitle,
                objective: missionObjective,
                situation: missionSituation,
                commanderintent: commanderIntent,
                conceptofoperation: conceptOfOperation,
                themestress: themeStress,
                themeavoid: themeAvoid,
                tasklist: toJSON(taskList)
            },
            success: function (response) {
                showAndDismissAlert("success", "<strong>Mission Details</strong> have been <strong>saved.</strong>");
                setTimeout(function () {
                    window.location.assign("ANMission2PCO?id=" + missionID)
                }, 3000);
            }
        });
    }
}
