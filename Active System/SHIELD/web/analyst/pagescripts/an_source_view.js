function initialize() {
    showAndDismissAlert('success', 'Excerpts of <strong>' + srcJSON.title + '</strong>');

    var srcTable = document.getElementById('src-table');
    var excrTable = document.getElementById('src-excerpts');

    var row = srcTable.insertRow(0);
    var srcType = row.insertCell(0);
    srcType.innerHTML = toTitleCase(srcJSON.classDesc);
    var srcName = row.insertCell(1);
    srcName.innerHTML = srcJSON.title;
    var srcDesc = row.insertCell(2);
    srcDesc.innerHTML = srcJSON.desc;
    var srcDatePub = row.insertCell(3);
    srcDatePub.innerHTML = srcJSON.published;

    

    if (map == null) {
        var latlng = new google.maps.LatLng(14.5800, 121.000)

        //Map
        var mapOptions = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(document.getElementById('source-view-map'), mapOptions);
        google.maps.event.addListener(map, 'click', function (event) {
            latLng = event.latLng;
            switchString = false;
            geocodeResultLatLng(latLng);
        });
    }
}
$(document).ready(function () {
    excrTable = $('#src-excerpts').DataTable({
        "ajax": {
            "url": "GetExcerptOfSource"
        },
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "columns": [
            {"data": "id"},
            {"data": "categoryDesc"},
            {"data": "text"},
            {"data": "level8"}
        ]
    });
    $('#src-excerpts tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        console.log(data);
        //row.setAttribute('onclick', "viewExcerpt(" + excrJSON[x].id + ")");
    });
});

function addressSearch() {
    switchString = true;
    var address = document.getElementById('address').value;
    geocodeResultString(address);
}

function positionMarker() {
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
    if (switchString) {
        latLng = new google.maps.LatLng(area.latLng.lat(), area.latLng.lng());
        positionMarker();
    }
    //set the address bard to the result
    var stringed = generateFullAddress(area);
    document.getElementById('address').value = stringed; //UP TO HERE
}

function viewExcerpt(id) {
    for (var x = 0; x < excrJSON.length; x++) {
        if (id == excrJSON[x].id) {

            document.getElementById('view-excerpttext').innerHTML = excrJSON[x].text;
            document.getElementById('category').innerHTML = excrJSON[x].categoryName;
            document.getElementById('source').innerHTML = srcJSON.name;
            document.getElementById('enter-tags').innerHTML = excrJSON[x].tags; //add TAGTEXT PLEASE DON'T FORGET DON'T
            document.getElementById('excerpt-num').innerHTML = "Excerpt " + excrJSON[x].id;
        }
    }
}

function saveExcerpt() {
    $.ajax({
        type: "GET",
        url: "SaveExcerpt",
        success: function (response) {
            $('#addExcerpt').modal('hide');
            showAndDismissAlert("success", response);
//            $.ajax({
//                type: "GET",
//                url: "GetSources",
//                success: function (response) {
//                    showAndDismissAlert("success", response);
//                    setTimeout(function () {
//                        window.location.assign("ANMission2DS")
//                    }, 3000);
//                }
//            });
        }
    });
}