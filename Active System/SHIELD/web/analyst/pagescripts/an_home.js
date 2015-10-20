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
            switchString = false;
            geocodeResultLatLng(latLng);
        });
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
        "columnDefs" : [
            {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
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

//Sending Data
function beginMission() {
    var missionTitle = document.getElementById("mission-title").value;
    var missionArea = document.getElementById("address").value;

    if (missionTitle === "" || missionArea === "") { //Change this back
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
                lng: latLng.lng()
            },
            success: function (response) {
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


//Searching Function
function addressSearch(){
    switchString = true;
    var address = document.getElementById('address').value;
    geocodeResultString(address);
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
}


function geocodeSuccess(result){ // This function is specific to this page
    area = generateAreaObject(result);
    if(switchString){
        latLng = new google.maps.LatLng(area.latLng.lat(), area.latLng.lng());
        positionMarker();
    }
    //set the address bard to the result
    var stringed = generateFullAddress(area);
    document.getElementById('address').value = stringed; //UP TO HERE
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
