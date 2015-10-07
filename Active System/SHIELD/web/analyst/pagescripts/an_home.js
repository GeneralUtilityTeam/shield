function initialize() {
    showAndDismissAlert('success', 'Welcome to <strong>SHIELD! </strong>');
	//ADDED THIS HERE SO PLEASE DELETE THE ONCLICK EVENT IN THE HTML FILE
	initializeMap();
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
    var locality;
    var administrative_area_level_2;
    var administrative_area_level_1;
    var country;
    
	
    areaArr.forEach(function(area){
        switch(area.type){
            case 'country':
                country = area.name;
                break;
            case 'administrative_area_level_1':
                administrative_area_level_1 = area.name;
                break;
            case 'administrative_area_level_2':
                administrative_area_level_2 = area.name;
                break;
            case 'locality':
                locality = area.name;
                break;
				
        }
    });
    if (missionTitle === "" || missionArea === "" || missionObjective === "") { //Change this back
        showAndDismissAlert("danger", "<strong>Begin Mission Failed.</strong> Please complete the form.");
    }
    else {
        $.ajax({
            type: "GET",
            url: "BeginNewMission",
            data: {
                missionTitle: missionTitle,
                missionObjective: missionObjective,
                locality: locality,
                administrative_area_level_2: administrative_area_level_2,
                administrative_area_level_1: administrative_area_level_1,
                country: country,
		lat: marker.getPosition().lat,
		lng: marker.getPosition().lng
            },
            success: function (response) {
                showAndDismissAlert("success", "You have successfully created a <strong>Mission.</strong>");
//                setTimeout(function () {
//                    window.location.assign("ANMission1MD?id=" + response)
//                }, 3000);
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
    if (map == null) {
        var mapOptions = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(document.getElementById('mission-area-map'), mapOptions);
		//CHANGED THIS ONE
		marker = new google.maps.Marker({
                            map: map,
                            draggable: false,
                            position: latlng
                        });
		google.maps.event.addListener(map, 'click', function (event) {
			var markerPosition = event.latLng;
            marker.setPosition(markerPosition);
            geocodeMouseClick(marker.getPosition());
		//UP TO HERE	

        });
    }

	
}


//GEOCODER FUNCTIONS
function geocodeString() {
    var address = document.getElementById('address').value;
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.panTo(results[0].geometry.location); //Sets the center of the map to the result's coordinates
			
			//CHANGED THIS DOWN HERE
			marker.setPosition = results[0].geometry.location
                         //UP TO HERE
            areaArr = formatAddressComponents(results[0].address_components);
			
        } else {
            alert("Google Map failed </strong>to locate the area.");
        }
    });
	
}
function geocodeMouseClick(pos) { // Runs a search based on a mouse click event
    geocoder.geocode({
        latLng: pos
    }, function (results) {
        if (results && results.length > 0) {
            map.panTo(results[0].geometry.location);
            areaArr = formatAddressComponents(results[0].address_components);
        } else {
            //I doubt this will ever happen, though
        }
    });
}
function formatAddressComponents(arr) { //This method takes in the address_components of either a Marker or Searchbar and shortens it into a usable array
	var returnArr = new Array();
    arr.forEach(function (comp) {
        comp.types.forEach(function (type) {
            if (type == 'locality' || type == 'administrative_area_level_2' || type == 'administrative_area_level_1' || type == 'country') {
                area = {
                    name: comp.long_name,
                    type: type
                };
                returnArr.push(area);
            }
        });
    });
	
	//ADDED THIS
	var stringed = returnArr.map(function(elem){
		return elem.name;
	}).join(", ");
	document.getElementById('address').value = stringed; //UP TO HERE
    return returnArr;
}
