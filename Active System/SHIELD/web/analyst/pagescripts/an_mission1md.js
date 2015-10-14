function initialize() {
    buildNav(missionStatus, 1);
    if (msonJSOB.title != null)
        document.getElementById('title').value = msonJSOB.title;
    if (msonJSOB.area != null)
        document.getElementById('address').value = generateFullAddress(msonJSOB.area);
    if (msonJSOB.threat != null)
        document.getElementById('address').value = msonJSOB.threat;
    if (msonJSOB.objective != null)
        document.getElementById('objective').innerHTML = msonJSOB.objective;
    if (msonJSOB.situation != null)
        document.getElementById('situation').innerHTML = msonJSOB.situation;
    if (msonJSOB.execution != null)
        document.getElementById('execution').innerHTML = msonJSOB.execution;
    if (msonJSOB.adminAndLogistics != null)
        document.getElementById('admin-logistics').innerHTML = msonJSOB.adminAndLogistics;
    if (msonJSOB.commandAndSignal != null)
        document.getElementById('command-signal').innerHTML = msonJSOB.commandAndSignal;

    //Load Keyword
    if (msonJSOB.objectiveKeywordList != null) {
        var objectiveKeyword = msonJSOB.objectiveKeywordList;
        for (var x = 0; x < objectiveKeyword.length; x++) {
            $('#objective-keyword').tagsinput('add', objectiveKeyword[x]);
        }
    }
    if (msonJSOB.situationKeywordList != null) {
        var situationKeyword = msonJSOB.situationKeywordList;
        for (var x = 0; x < situationKeyword.length; x++) {
            $('#situation-keyword').tagsinput('add', situationKeyword[x]);
        }
    }
    if (msonJSOB.executionKeywordList != null) {
        var executionKeyword = msonJSOB.executionKeywordList;
        for (var x = 0; x < executionKeyword.length; x++) {
            $('#execution-keyword').tagsinput('add', executionKeyword[x]);
        }
    }
    if (msonJSOB.adminAndLogisticsKeywordList != null) {
        var adminAndLogisticsKeyword = msonJSOB.adminAndLogisticsKeywordList;
        for (var x = 0; x < adminAndLogisticsKeyword.length; x++) {
            $('#admin-logistics-keyword').tagsinput('add', adminAndLogisticsKeyword[x]);
        }
    }
    if (msonJSOB.commandAndSignalKeywordList != null) {
        var commandAndSignalKeyword = msonJSOB.commandAndSignalKeywordList;
        for (var x = 0; x < commandAndSignalKeyword.length; x++) {
            $('#command-signal-keyword').tagsinput('add', commandAndSignalKeyword[x]);
        }
    }
    
}

function saveMD() {
    var title = document.getElementById("title").value;
    var threat = document.getElementById("threat").value;
    var objective = document.getElementById("objective").value;
    var situation = document.getElementById("situation").value;
    var execution = document.getElementById("execution").value;
    var adminAndLogistics = document.getElementById("admin-logistics").value;
    var commandAndSignal = document.getElementById("command-signal").value;

    var objectiveKeywordList = $('#objective-keyword').tagsinput('items');
    var situationKeywordList = $('#situation-keyword').tagsinput('items');
    var executionKeywordList = $('#execution-keyword').tagsinput('items');
    var adminAndLogisticsKeywordList = $('#admin-logistics-keyword').tagsinput('items');
    var commandAndSignalKeywordList = $('#command-signal-keyword').tagsinput('items');

    if (title === "" || threat === "" ||
            objective === "" || situation === "" || execution === "" ||
            adminAndLogistics === "" || commandAndSignal === "") {
        showAndDismissAlert("danger", "<strong>Save Mission Details failed.</strong> Please complete the form.");
    }
    else {
        console.log(objectiveKeywordList);
        $.ajax({
            type: "GET",
            url: "Save1MD",
            data: {
                id: msonJSOB.id,
                title: title,
                threat: threat,
                objective: objective,
                situation: situation,
                execution: execution,
                adminAndLogistics: adminAndLogistics,
                commandAndSignal: commandAndSignal,
                objectiveKeywordList: toJSON(objectiveKeywordList),
                situationKeywordList: toJSON(situationKeywordList),
                executionKeywordList: toJSON(executionKeywordList),
                adminAndLogisticsKeywordList: toJSON(adminAndLogisticsKeywordList),
                commandAndSignalKeywordList: toJSON(commandAndSignalKeywordList)
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
