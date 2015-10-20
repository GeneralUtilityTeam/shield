function initialize() {
    showAndDismissAlert('success', 'Excerpts of <strong>' + srcJSON.title + '</strong>');

    srcTable = document.getElementById('src-table');

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

    var dropdown = document.getElementById("input-excerpt-category");
    ctgyJSON.forEach(function (conf) {
        var option = document.createElement("option");
        option.setAttribute("label", conf.valueText);
        option.setAttribute("value", conf.id);
        dropdown.appendChild(option);
    });
}
$(document).ready(function () {
    excrTable = $('#src-excerpts').DataTable({
        "ajax": {
            "url": "GetExcerptOfSource",
            "dataSrc": ""
        },
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "columns": [
            {"data": "id"},
            {"data": "categoryDesc"},
            {"data": "text"}
        ]
    });
    $('#src-excerpts tbody').on('click', 'tr', function () {
        var data = excrTable.row(this).data();
        viewExcerpt(data.id);
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
    $('#viewExcerpt').modal('show');
    $.ajax({
        type: "GET",
        url: "GetExcerpt",
        data: {
            id: id
        },
        success: function (responseJson) {
            var excerpt = responseJson;
            document.getElementById('view-excerpt-text').innerHTML = excerpt.text;
            document.getElementById('category').innerHTML = excerpt.categoryDesc;
            //document.getElementById('enter-tags').innerHTML = 
            var tagList = excerpt.tagList;
            $('#enter-tags').tagsinput('clearAll');
            if (tagList != null) {
                tagList.forEach(function (conf) {
                    $('#enter-tags').tagsinput('add', conf);
                });
            }
            document.getElementById('excerpt-num').innerHTML = "Excerpt " + excerpt.id;
        }
    });
}

function saveExcerpt() {
    var text = document.getElementById("input-excerpt-text").value;
    if (checkIfEmpty(text)) {
        showAndDismissAlert("warning", "Please input excerpt text");
    }
    else if (area == null) {
        showAndDismissAlert("warning", "Please enter an area");
    }
    else {
        var categoryID = document.getElementById("input-excerpt-category").value;
        var tagList = $('#input-excerpt-tags').tagsinput('items');
        $.ajax({
            type: "GET",
            url: "SaveExcerpt",
            data: {
                categoryID: categoryID,
                text: text,
                tagList: toJSON(tagList),
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
                $('#addSource').modal('hide');
                showAndDismissAlert("success", "<strong>New Source</strong> has been <strong>added.</strong>");
                document.getElementById("input-excerpt-text").value = "";
                $('#input-excerpt-tags').tagsinput('removeAll');
                excrTable.ajax.reload();
            }
        });
    }
}