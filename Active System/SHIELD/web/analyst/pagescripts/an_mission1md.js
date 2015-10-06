function initialize() {
    console.log(msonJSOB);
    buildNav(msonJSOB.status, 1);
    if (msonJSOB.title != 'undefined')
        document.getElementById('mission-title').value = msonJSOB.title;
    if (msonJSOB.area != null) {
        document.getElementById('address').value = msonJSOB.area.Name;
        areaJSON = msonJSOB.area;
        initializeMap();
    }
    if (msonJSOB.objective != 'undefined')
        document.getElementById('mission-objective').innerHTML = msonJSOB.objective;
    if (msonJSOB.commanderIntent != 'undefined')
        document.getElementById('commander-intent').innerHTML = msonJSOB.commanderIntent;
    if (msonJSOB.conceptOfOperation != 'undefined')
        document.getElementById('concept-of-operation').innerHTML = msonJSOB.conceptOfOperation;
    if (msonJSOB.themeStress != 'undefined')
        document.getElementById('theme-stress').innerHTML = msonJSOB.themeStress;
    if (msonJSOB.themeAvoid != 'undefined')
        document.getElementById('theme-avoid').innerHTML = msonJSOB.themeAvoid;
    if (msonJSOB.situation != 'undefined')
        document.getElementById('mission-situation').innerHTML = msonJSOB.situation;
    for (var x = 0; x < msonJSOB.taskList.length; x++) {
        addTask(msonJSOB.taskList[x].psyopsElement, msonJSOB.taskList[x].desc);
    }

}
function addTask(psyopElement, text) {
    var taskSection = document.getElementById("task-table");
    var row = document.createElement("tr");
    var cell = row.insertCell(0);
    var elementArea = document.createElement('textarea');
    elementArea.setAttribute("type", "text");
    elementArea.setAttribute("class", "form-box");
    elementArea.setAttribute("rows", 4);
    elementArea.setAttribute("cols", 50);
    elementArea.setAttribute("placeholder", "PSYOP Element");
    elementArea.setAttribute("name", "element" + taskSection.rows.length);
    elementArea.setAttribute("style", "margin-top: 5px; width: 20%; resize: none");
    elementArea.innerHTML = psyopElement;
    cell.appendChild(elementArea);
    var taskArea = document.createElement('textarea');
    taskArea.setAttribute("type", "text;");
    taskArea.setAttribute("class", "form-box");
    taskArea.setAttribute("rows", 4);
    taskArea.setAttribute("cols", 50);
    taskArea.setAttribute("placeholder", "Task");
    taskArea.setAttribute("name", "task" + taskSection.rows.length);
    taskArea.setAttribute("style", "margin-top: 5px; width: 80%; resize: none");
    taskArea.innerHTML = text;
    cell.appendChild(taskArea);
    taskSection.appendChild(row);
    $('html, body').scrollTop($(document).height());
}

function saveMD() {
    var missionTitle = document.getElementById("mission-title").value;
    var missionArea = document.getElementById("address").value;
    var missionObjective = document.getElementById("mission-objective").value;
    var missionSituation = document.getElementById("mission-situation").value;
    var commanderIntent = document.getElementById("commander-intent").value;
    var conceptOfOperation = document.getElementById("concept-of-operation").value;
    var themeStress = document.getElementById("theme-stress").value;
    var themeAvoid = document.getElementById("theme-avoid").value;
    //Please create variable for Task

    if (missionTitle === "" || missionArea === "" || missionObjective === "" ||
            missionSituation === "" || commanderIntent === "" || conceptOfOperation === "" ||
            themeStress === "" || themeAvoid === "") {
        showAndDismissAlert("danger", "<strong>Save Mission Details failed.</strong> Please complete the form.");
    }
    else {
        $.ajax({
            type: "GET",
            url: "Save1MD",
            data: {
                missionTitle: missionTitle,
                missionArea: saveElements(),
                missionObjective: missionObjective,
                missionSituation: missionSituation,
                commanderIntent: commanderIntent,
                conceptOfOperation: conceptOfOperation,
                themeStress: themeStress,
                themeAvoid: themeAvoid
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

function initializeMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(areaJSON.Latitude, areaJSON.Longitude);
    var mapOptions = {
        zoom: 13,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById('mission1md-area-map'), mapOptions);
    google.maps.event.addListener(map, 'click', function () {
        infowindow.close();
    });
    savedArea = areaJSON.Name;
    document.getElementById("address").value = savedArea;
    geocoder.geocode({'address': savedArea}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            if (marker) {
                marker.setMap(null);
                if (infowindow)
                    infowindow.close();
            }
            marker = new google.maps.Marker({
                map: map,
                draggable: true,
                position: results[0].geometry.location
            });
            google.maps.event.addListener(marker, 'dragend', function () {
                // updateMarkerStatus('Drag ended');
                geocodePosition(marker.getPosition());
            });
            google.maps.event.addListener(marker, 'click', function () {
                if (marker.formatted_address) {
                    infowindow.setContent(marker.formatted_address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
                } else {
                    infowindow.setContent(savedArea + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
                }
                infowindow.open(map, marker);
            });
            google.maps.event.trigger(marker, 'click');
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function clone(obj) {
    if (obj == null || typeof (obj) != 'object')
        return obj;
    var temp = new obj.constructor();
    for (var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}


function geocodePosition(pos) {
    geocoder.geocode({
        latLng: pos
    }, function (responses) {
        if (responses && responses.length > 0) {
            marker.formatted_address = responses[0].formatted_address;
        } else {
            marker.formatted_address = 'Cannot determine address at this location.';
        }
        infowindow.setContent(marker.formatted_address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
        infowindow.open(map, marker);
    });
}

function codeAddress() {
    address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            if (marker) {
                marker.setMap(null);
                if (infowindow)
                    infowindow.close();
            }
            marker = new google.maps.Marker({
                map: map,
                draggable: true,
                position: results[0].geometry.location
            });
            google.maps.event.addListener(marker, 'dragend', function () {
                // updateMarkerStatus('Drag ended');
                geocodePosition(marker.getPosition());
            });
            google.maps.event.addListener(marker, 'click', function () {
                if (marker.formatted_address) {
                    infowindow.setContent(marker.formatted_address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
                } else {
                    infowindow.setContent(address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
                }
                infowindow.open(map, marker);
            });
            google.maps.event.trigger(marker, 'click');
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
function saveElements() {
    var mapElements = {
        Longitude: marker.getPosition().lng().toFixed(6),
        Latitude: marker.getPosition().lat().toFixed(6),
        Zoom: map.getZoom(),
        Name: marker.formatted_address
    };

    var stringElements = JSON.stringify(mapElements);
    alert(stringElements);

}