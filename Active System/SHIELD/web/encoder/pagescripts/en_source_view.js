function initialize() {
    document.getElementById("global-username").innerHTML = userFullName + " ";
    showAndDismissAlert('success', 'Excerpts of <strong>' + srcJSON.title + '</strong>');

    srcTable = document.getElementById('src-table');

    var row = srcTable.insertRow(0);
    var srcType = row.insertCell(0);
    srcType.innerHTML = toTitleCase(srcJSON.classDesc);
    var srcName = row.insertCell(1);
    if (srcJSON.version <= 1) {
        srcName.innerHTML = srcJSON.title;
    }
    else {
        srcName.innerHTML = srcJSON.title + ' v' + srcJSON.version;
    }
    var srcDesc = row.insertCell(2);
    srcDesc.innerHTML = srcJSON.desc;
    var srcDatePub = row.insertCell(3);
    srcDatePub.innerHTML = srcJSON.published;

    //For update Source
    var sourceDropdown = document.getElementById("source-type");
    clssJSON.forEach(function (conf) {
        var option = document.createElement("option");
        option.setAttribute("label", toTitleCase(conf.valueText));
        option.setAttribute("value", conf.id);
        sourceDropdown.appendChild(option);
    });

    document.getElementById("source-type").value = srcJSON.classID;
    document.getElementById("source-name").value = srcJSON.title;
    document.getElementById("source-description").value = srcJSON.desc;
    document.getElementById("source-date").value = srcJSON.published;
    $('#src-table').on('click', 'tr', function () {
        $('#updateSource').modal('show');
    });

    //End of update source

    //Add Version of Source

    document.getElementById("version-source-type").value = toTitleCase(srcJSON.classDesc);
    document.getElementById("version-source-name").value = srcJSON.title;
    document.getElementById("version-source-description").value = srcJSON.desc;
    document.getElementById("version-source-date").value = srcJSON.published;


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
            positionMarker(latLng);
            geocodeResultLatLng(latLng);
        });
    }
    initializeGeocoder();

    var dropdown = document.getElementById("input-excerpt-category");
    ctgyJSON.forEach(function (conf) {
        var option = document.createElement("option");
        option.setAttribute("label", toTitleCase(conf.valueText));
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
        ],
        "columnDefs": [
            {
                "render": function (data, type, row) {
                    return toTitleCase(data);
                },
                "targets": 1
            }
        ]
    });
    $('#src-excerpts tbody').on('click', 'tr', function () {
        var data = excrTable.row(this).data();
        viewExcerpt(data.id);
    });


    versionExcrTable = $('#version-src-excerpts').DataTable({
        "ajax": {
            "url": "GetExcerptOfSource",
            "dataSrc": ""
        },
        "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        "columns": [
            {"data": "id"},
            {"data": "categoryDesc"},
            {"data": "text"},
            {"data": "id"}
        ],
        "columnDefs": [
            {
                "render": function (data, type, row) {
                    return toTitleCase(data);
                },
                "targets": 1
            }
        ],
        "fnRowCallback": function (nRow, data) {
            /* Turn the fourt row -- progress -- into a progressbar with bootstrap */

            checkBox = '<input type="checkbox" id="check' + data.id + '" style="display: block;   margin-left: auto;   margin-right: auto;">';

            $('td:eq(3)', nRow).html(checkBox);
            return nRow;
        }
    });
});

function addressSearch() {
    switchString = true;
    var address = document.getElementById('address').value;
    geocodeResultString(address);
}

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
    if (switchString) {
        latLng = new google.maps.LatLng(area.latLng.lat(), area.latLng.lng());
        positionMarker(latLng);
    }
    //set the address bard to the result
    var stringed = generateFullAddress(area);
    document.getElementById('address').value = stringed; //UP TO HERE
    map.setCenter(new google.maps.LatLng(area.latLng.lat(), area.latLng.lng()));
}

function initializeMap() {
    $("#addExcerpt").modal().on("shown.bs.modal", function () {
        google.maps.event.trigger(map, 'resize');
    });
}

function viewExcerpt(id) {
    $.ajax({
        type: "GET",
        url: "GetExcerpt",
        data: {
            id: id
        },
        success: function (responseJson) {
            var excerpt = responseJson;
            document.getElementById('view-excerpt-text').innerHTML = excerpt.text;
            document.getElementById('category').innerHTML = toTitleCase(excerpt.categoryDesc);
            document.getElementById('source').innerHTML = srcJSON.title;
            //document.getElementById('enter-tags').innerHTML = 
            var tagList = excerpt.tagList;
            $('#enter-tags').tagsinput('removeAll');
            if (tagList != null) {
                tagList.forEach(function (conf) {
                    $('#enter-tags').tagsinput('add', conf);
                });
            }
            document.getElementById('excerpt-num').innerHTML = "Excerpt " + excerpt.id;

            $('#viewExcerpt').modal('show');
            $('#update-excerpt-button').on('click', function () {
                activeID = id;
                $('#viewExcerpt').modal('hide');
                document.getElementById('address').value = generateFullAddress(excerpt.area);
                addressSearch();

                $('#input-excerpt-category').val(excerpt.categoryID);
                document.getElementById('input-excerpt-text').value = excerpt.text;
                var tagList = excerpt.tagList;
                $('#input-excerpt-tags').tagsinput('removeAll');
                if (tagList != null) {
                    tagList.forEach(function (conf) {
                        $('#input-excerpt-tags').tagsinput('add', conf);
                    });
                }
                $('#add-update-btn').text("Update Excerpt");

                document.getElementById("add-update-btn").setAttribute("onclick", "updateExcerpt()");
                $('#addExcerpt').modal('show');
                initializeMap();
            });
        }
    });
}


function addExcerpt() {
    $('#add-update-btn').text("Add Excerpt");

    document.getElementById('input-excerpt-text').value = "";
    document.getElementById('address').value = "";
    $('#input-excerpt-tags').tagsinput('removeAll');
    document.getElementById("add-update-btn").setAttribute("onclick", "saveExcerpt()");
    $('#addExcerpt').modal('show');
    initializeMap();
}

function clearInput() {
    document.getElementById("input-excerpt-text").value = "";
    area = null;
    document.getElementById('address').value = ""
    $('#input-excerpt-tags').tagsinput('removeAll');
}

function saveExcerpt() {
    var proceed = true;
    var text = document.getElementById("input-excerpt-text").value;
    var tagList = $('#input-excerpt-tags').tagsinput('items');
    if (checkIfEmpty(text)) {
        showAndDismissAlert("danger", "Please Input <strong>Excerpt Text.</strong>");
        proceed = false;
    }
    if (area == null) {
        showAndDismissAlert("danger", "Please Locate an <strong>Area.</strong>");
        proceed = false;
    }
    if (tagList.length == 0) {
        showAndDismissAlert("danger", "Please Enter <strong>Tags.</strong>");
        proceed = false;
    }
    if (proceed) {
        var categoryID = document.getElementById("input-excerpt-category").value;

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
                $('#addExcerpt').modal('hide');
                document.getElementById("input-excerpt-text").value = "";
                $('#input-excerpt-tags').tagsinput('removeAll');

                showAndDismissAlert("success", "<strong>New Excerpt</strong> has been <strong>added.</strong>");
                excrTable.ajax.reload();
                versionExcrTable.ajax.reload();
            }
        });
    }
}

function updateExcerpt() {
    var proceed = true;
    var text = document.getElementById("input-excerpt-text").value;
    var tagList = $('#input-excerpt-tags').tagsinput('items');
    if (checkIfEmpty(text)) {
        showAndDismissAlert("danger", "Please Input <strong>Excerpt Text.</strong>");
        proceed = false;
    }
    if (area == null) {
        showAndDismissAlert("danger", "Please Locate an <strong>Area.</strong>");
        proceed = false;
    }
    if (tagList.length == 0) {
        showAndDismissAlert("danger", "Please Enter <strong>Tags.</strong>");
        proceed = false;
    }
    if (proceed) {
        var categoryID = document.getElementById("input-excerpt-category").value;

        $.ajax({
            type: "GET",
            url: "UpdateExcerpt",
            data: {
                excerptID: activeID,
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
                $('#addExcerpt').modal('hide');
                document.getElementById("input-excerpt-text").value = "";
                $('#input-excerpt-tags').tagsinput('removeAll');

                showAndDismissAlert("success", "<strong>Excerpt</strong> has been <strong>updated.</strong>");
                excrTable.ajax.reload();
                versionExcrTable.ajax.reload();
            }
        });
    }
}


function saveSource() {
    var proceed = true;
    var sourceClass = document.getElementById("source-type").value;
    var sourceName = document.getElementById("source-name").value;
    var sourceDesc = document.getElementById("source-description").value;
    var sourceDate = document.getElementById("source-date").value;
    if (checkIfEmpty(sourceName)) {
        showAndDismissAlert("danger", "Please input <strong>source name</strong>");
        proceed = false;
    }
    if (checkIfEmpty(sourceDesc)) {
        showAndDismissAlert("danger", "Please input <strong>source description</strong>");
        proceed = false;
    }

    if (sourceDate == null) {
        showAndDismissAlert("danger", "Please input <strong>source date</strong>");
        proceed = false;
    }
    if (proceed) {
        $.ajax({
            type: "GET",
            url: "UpdateSource",
            data: {
                sourceID: srcJSON.id,
                class: sourceClass,
                title: sourceName,
                desc: sourceDesc,
                published: sourceDate
            },
            success: function (response) {
                $('#addSource').modal('hide');
                showAndDismissAlert("success", "<strong>Source</strong> has been <strong>updated.</strong>");
                srcTable = document.getElementById('src-table');
                srcTable.innerHTML = "";
                var row = srcTable.insertRow(0);
                var srcType = row.insertCell(0);
                srcType.innerHTML = sourceClass;
                var srcName = row.insertCell(1);
                srcName.innerHTML = sourceName;
                var srcDesc = row.insertCell(2);
                srcDesc.innerHTML = sourceDesc;
                var srcDatePub = sourceDesc;
                srcDatePub.innerHTML = sourceDate;
            }
        });
    }
}

function saveVersion() {
    var proceed = true;
    var sourceDesc = document.getElementById("version-source-description").value;
    var sourceDate = document.getElementById("version-source-date").value;
    var versionExcr = [];

    versionExcrTable
            .column(0)
            .data()
            .each(function (value, index) {
                if ($('#check' + value).prop('checked') == true)
                    versionExcr.push(value);
            });
    if (checkIfEmpty(sourceDesc)) {
        showAndDismissAlert("danger", "Please input <strong>source description</strong>");
        proceed = false;
    }

    if (sourceDate == null) {
        showAndDismissAlert("danger", "Please input <strong>source date</strong>");
        proceed = false;
    }
    if (proceed) {
        $.ajax({
            type: "GET",
            url: "ReviseSource",
            data: {
                sourceID: srcJSON.id,
                desc: sourceDesc,
                published: sourceDate,
                excrArr: toJSON(versionExcr)
            },
            success: function (response) {
                showAndDismissAlert("success", "<strong>New Version</strong> has been <strong>added.</strong>");
                window.location.assign("ENSourceView?id=" + response.id);
            }
        });
    }
}