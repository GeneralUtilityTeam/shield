
function initialize() {
    showAndDismissAlert('success', 'Welcome to <strong>SHIELD! </strong>');
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
            {"data": "objective"},
            {"data": "area"},
            {"data": "status"}
        ],
        "fnRowCallback": function (nRow, data) {
            /* Turn the fourt row -- progress -- into a progressbar with bootstrap */
            progressString = '<div class="progress active"><div class="progress-bar ' + defineProgressBar(data.status) + '" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: ' + data.status * 14.28 + '%;">' + data.status + ' of 7 Steps</div></div>';
            $('td:eq(3)', nRow).html(progressString);
            return nRow;
        }
    });
    $('#mission-table tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        window.location.assign("ANMission1MD?id=" + data.id);
    });
});

function beginMission() {
    var missionTitle = document.getElementById("mission-title").value;
    var missionArea = document.getElementById("address").value;
    var missionObjective = document.getElementById("mission-objective").value;

    if (missionTitle === "" || missionArea === "" || missionObjective === "") {
        showAndDismissAlert("danger", "<strong>Begin Mission Failed.</strong> Please complete the form.");
    }
    else {
        $.ajax({
            type: "GET",
            url: "BeginNewMission",
            data: {
                missionTitle: missionTitle,
                missionArea: saveElements(),
                missionObjective: missionObjective
            },
            success: function (response) {
                showAndDismissAlert("success", "You have successfully created a <strong>Mission.</strong>");
                setTimeout(function () {
                    window.location.assign("ANMission1MD?id=" + response.id)
                }, 3000);
            }
        });
    }
}

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
    else if (status == 7) {
        return progressBar = "progress-bar-success";
    }
}

function defineProgressPercent(status) {
    var statusInt = parseInt(status);
    return statusInt * 14.28;
}

//Map Function
function initializeMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(14.5800, 121.000);
    var mapOptions = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById('mission-area-map'), mapOptions);
    google.maps.event.addListener(map, 'click', function () {
        infowindow.close();
    });
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
        infowindow.setContent(marker.formatted_address + "<br>Coordinates: " + marker.getPosition().toUrlValue(6));
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
            showAndDismissAlert("danger", " <strong>Google Map failed </strong>to locate the area.");
            document.getElementById("address").value = "";
        }
    });
}

function saveElements() {
    var mapElements = {
        Longitude: map.getCenter().lng().toFixed(6),
        Latitude: map.getCenter().lat().toFixed(6),
        Zoom: map.getZoom(),
        Name: address
    };

    var area = JSON.stringify(mapElements);
    return area;
}

