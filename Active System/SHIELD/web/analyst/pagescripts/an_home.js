//Global Variables
var address;
var area;
var latLng;
var map;
var marker;
var addressHQ;
var areaHQ;
var latLngHQ;
var markerHQ;

//Initialize
function initialize() {
    //Greeting Alert
    validateLogin();
    showAndDismissAlert('success', 'Welcome to <strong>SHIELD! </strong>');
    document.getElementById("global-username").innerHTML = userFullName + " ";
    //Map Initalization
    if (map == null) {
        var latlng = new google.maps.LatLng(14.5800, 121.000)

        //Map
        var mapOptions = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(document.getElementById('mission-area-map'), mapOptions);

    }

    //Geocoder Initialization
    initializeGeocoder();
}

//Data Table Function
$(document).ready(function () {
    var table = $('#mission-table').DataTable({
        "ajax": {
            "url": "GetOngoingMissionOfUser",
            "dataSrc": ""
        },
        "lengthMenu": [[6, 10, 25, 50, -1], [6, 10, 25, 50, "All"]],
        "columns": [
            {"data": "title"},
            {"data": "area"},
            {"data": "status"}
        ],
        "columnDefs": [
            {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function (data, type, row) {
                    return generateFullAddress(data);
                },
                "targets": 1
            }
        ],
        "fnRowCallback": function (nRow, data) {
            /* Turn the fourt row -- progress -- into a progressbar with bootstrap */
            progressString = '<div class="progress active"><div class="progress-bar ' + defineProgressBar(data.status) + '" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: ' + data.status * 14.28 + '%;">' + data.status + ' of 6 Steps</div></div>';
            $('td:eq(2)', nRow).html(progressString);
            return nRow;
        }
    });
    $('#mission-table tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        window.location.assign("ANMission1MD?id=" + data.id);
    });


});

function initializeMap() {
    $("#beginMission").modal().on("shown.bs.modal", function () {
        google.maps.event.trigger(map, 'resize');
    });
}

//Sending Data
function beginMission() {
    var missionTitle = document.getElementById("mission-title").value;
    var missionArea = document.getElementById("address").value;
    var missionHQ = document.getElementById("address-hq").value;

    if (missionTitle === "" || missionArea === "" || missionHQ === "") { //Change this back
        showAndDismissAlert("danger", "<strong>Begin Mission Failed.</strong> Please complete the form.");
    }
    else {
        $.ajax({
            type: "GET",
            url: "BeginNewMission",
            data: {
                missionTitle: missionTitle,
                level8: area.level8,
                level7: area.level7,
                level6: area.level6,
                level5: area.level5,
                level4: area.level4,
                level3: area.level3,
                level2: area.level2,
                level1: area.level1,
                lat: latLng.lat(),
                lng: latLng.lng(),
                latHQ: latLngHQ.lat(),
                lngHQ: latLngHQ.lng()
            },
            success: function (response) {
                if (response.missionID != -1) {
                    showAndDismissAlert("success", "You have successfully created a <strong>Mission.</strong>");
                    window.location.assign("ANMission1MD?id=" + response.missionID);
                }
                else {
                    showAndDismissAlert("error", "Error");
                }

            }
        });
    }
}


//Searching Function
function addressSearch() {
    var address = document.getElementById('address').value;
    geocodeResultString(address);
}

//Map Functions
function positionMarker(latLng) {
    if (marker == null) {
        marker = new google.maps.Marker({
            map: map,
            draggable: false,
            position: latLng
        });
    }
    else {
        marker.setPosition(latLng);
    }
}


function geocodeSuccess(result) { // This function is specific to this page
    area = generateAreaObject(result);
    latLng = new google.maps.LatLng(area.latLng.lat(), area.latLng.lng());
    positionMarker(latLng);
    //set the address bard to the result
    var stringed = generateFullAddress(area);
    document.getElementById('address').value = stringed; //UP TO HERE
    setBounds();
}

//Searching Function for Headquarters
function addressHQSearch() {
    var addressHQ = document.getElementById('address-hq').value;
    geocodeHQResultString(addressHQ);
}
function geocodeHQResultString(str) { // Takes String Address; Returns geocode results
    geocoder.geocode({
        'address': str
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            geocodeHQSuccess(results[0]);
        } else {
            return null;
        }
    });
}
//Map Functions
function positionHQMarker(latLng) {
    if (markerHQ == null) {
        markerHQ = new google.maps.Marker({
            map: map,
            draggable: false,
            position: latLng
        });
    }
    else {
        markerHQ.setPosition(latLng);
    }
}


function geocodeHQSuccess(result) { // This function is specific to this page
    areaHQ = generateAreaObject(result);
    latLngHQ = new google.maps.LatLng(areaHQ.latLng.lat(), areaHQ.latLng.lng());
    positionHQMarker(latLngHQ);
    //set the address bar to the result
    var stringed = generateFullAddress(areaHQ);
    document.getElementById('address-hq').value = stringed; //UP TO HERE
    setBounds();
}

//UI Functions
function defineProgressBar(status) {
    var progressBar;
    if (status == 1 || status == 2) {
        return progressBar = "progress-bar-danger";
    }
    else if (status == 3 || status == 4) {
        return progressBar = "progress-bar-warning";
    }
    else if (status == 5 || status == 6) {
        return progressBar = "progress-bar-info";
    }
}
function defineProgressPercent(status) {
    var statusInt = parseInt(status);
    return statusInt * 14.28;
}
function setBounds() {
    var bounds = new google.maps.LatLngBounds();
    if (latLng != null)
        bounds.extend(latLng);
    if (latLngHQ != null)
        bounds.extend(latLngHQ);
    map.fitBounds(bounds);
}