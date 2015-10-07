//an_home.jsp Javascript Files

//Initialize
function initialize() {
    //Greeting Alert
    showAndDismissAlert('success', 'Welcome to <strong>SHIELD! </strong>');
    
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
        google.maps.event.addListener(map, 'click', function (event) {
            latLng = event.latLng;
            positionMarker();
            geocodeMouseClick(marker.getPosition());
        });
    }
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

//Sending Data
function beginMission() {
    var missionTitle = document.getElementById("mission-title").value;
    var missionArea = document.getElementById("address").value;
    var missionObjective = document.getElementById("mission-objective").value;
    var sublocality;
    var locality;
    var administrative_area_level_2;
    var administrative_area_level_1;
    var country;

    //areaArr is a global variable in the jsp. It is set by the function geocoderSuccess
    areaArr.forEach(function (area) {
        switch (area.type) {
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
            case 'sublocality':
                sublocality = area.name;
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
                sublocality: sublocality,
                locality: locality,
                administrative_area_level_2: administrative_area_level_2,
                administrative_area_level_1: administrative_area_level_1,
                country: country,
                lat: latLng.lat(),
                lng: latLng.lng()
            },
            success: function (response) {
                console.log(response);
                if (response.missionID != -1) {
                    showAndDismissAlert("success", "You have successfully created a <strong>Mission.</strong>");
                    setTimeout(function () {
                        window.location.assign("ANMission1MD?id=" + response.missionID)
                    }, 3000);
                }
                else {
                    showAndDismissAlert("error", "Error");
                }

            }
        });
    }
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
    else if (status == 7) {
        return progressBar = "progress-bar-success";
    }
}
function defineProgressPercent(status) {
    var statusInt = parseInt(status);
    return statusInt * 14.28;
}

//Searching Function
function addressSearch(){
    var address = document.getElementById('address').value;
    geocodeString(address);
}

//Map Functions
function positionMarker(){
    if(marker == null){
        marker = new google.maps.Marker({
            map: map,
            draggable: false,
            position: latLng
        });
    }
    else{
        marker.setPosition(latLng);
    }
    console.log(latLng);
}
//Geocoder Functions V1.0 - 10/7/2015
function geocodeSuccess(arr){ // This function is specific to this page
    //set global array to the results
    areaArr = arr;
    //set the address bard to the result
    var stringed = areaArr.map(function (elem) {
        return elem.name;
    }).join(", ");
    document.getElementById('address').value = stringed; //UP TO HERE
}
function geocodeString(str) { // Runs a search based on the contents of #address
    console.log(str);
    geocoder.geocode({
        'address': str
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            latLng = results[0].geometry.location;
            //Map Pan
            map.panTo(latLng); 
            //Marker Set
            positionMarker();
            //Formatted Arr
            var formattedArr = formatAddressComponents(results[0].address_components);

            geocodeSuccess(formattedArr);
        } else {
            //I doubt this will ever happen, though
        }
    });
}
function geocodeMouseClick(pos) { // Runs a search based on a mouse click event
    geocoder.geocode({
        latLng: pos
    }, function (results) {
        if (results && results.length > 0) {
            var formattedArr = formatAddressComponents(results[0].address_components);
            geocodeSuccess(formattedArr);
        } else {
            //I doubt this will ever happen, though
        }
    });
}
function formatAddressComponents(arr) { //This method takes in the address_components of either a Marker or Searchbar and shortens it into a usable array
    var returnArr = new Array();
    arr.forEach(function (comp) {
        comp.types.forEach(function (type) {
            if (type == 'sublocality' || type == 'locality' || type == 'administrative_area_level_2' || type == 'administrative_area_level_1' || type == 'country') {
                var area = {
                    name: comp.long_name,
                    type: type
                };
                returnArr.push(area);
            }
        });
    });
    return returnArr;
}
