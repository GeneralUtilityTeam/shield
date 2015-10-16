var excerptList;
var searchMarker = [];
var entity;
var entityCounter = 0;
var entityArr = [];
var usedKeywords = [], unusedKeywords = [];
var selectedMarker = [];

function initialize() { //Change this to take entities
    buildNav(missionStatus, 2);
    loadAreaSlider();
    initializeMap();

    if (entity == null) {
        entity = new Array();
        entityCounter = 0;
    }
    else {
        entityCounter = entity.length;
        loadEntity();
    }
    //set entity array to the mission entity
}

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "GetEEntityOfMission",
        data: {
            missionID: missionID

        },
        success: function (responseJSON) {
            entity = responseJSON;
            initialize();
        }
    });

    if (keywordList != null) {
        unusedKeywords = keywordList;
        for (var x = 0; x < unusedKeywords.length; x++) {
            $('#unused-keyword').tagsinput('add', unusedKeywords[x]);
        }
    }

    $('#search-field').autocomplete({
        minChars: 0,
        lookup: keywordList,
        onSelect: function (suggestion) {
            displayKeywords(suggestion.value);
            $.ajax({
                type: "GET",
                url: "PrimaryExcerptSearch",
                data: {
                    param: suggestion.value,
                },
                success: function (responseJson) {
                    excerptList = responseJson;
                    mc.clearMarkers();
                    setMarkersOnMap(null, searchMarker);
                    searchMarker = [];
                    if (excerptList.length > 0) {
                        createSearchMarker();
                    }
                    else
                        showAndDismissAlert("danger", "<strong>No Results Found! </strong>");
                }
            });
        }
    });
    $("#search-field").keydown(function () {

        if (event.keyCode == 13) {
            $.ajax({
                type: "GET",
                url: "PrimaryExcerptSearch",
                data: {
                    param: $("#search-field").val(),
                },
                success: function (responseJson) {
                    excerptList = responseJson;
                    mc.clearMarkers();
                    setMarkersOnMap(null, searchMarker);
                    searchMarker = [];
                    if (excerptList.length > 0) {
                        createSearchMarker();
                    }
                    else
                        showAndDismissAlert("danger", "<strong>No Results Found! </strong>");
                }
            });
        }

    });
});

var mapOptions;
var geocoder;
var map;
var zoom;
var oms;
var infoWindow;
var mc;
var minClusterZoom = 19;

function initializeMap() {
    mapOptions = {
        center: new google.maps.LatLng(7.190708, 125.455341),
        zoom: 10,
        minZoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    var clusterStyles = [
        {
            textColor: 'black',
            url: 'http://www.zudusilatvija.lv/static//images/cluster.png',
            height: 52,
            width: 52
        },
        {
            textColor: 'black',
            url: 'http://www.zudusilatvija.lv/static//images/cluster.png',
            height: 52,
            width: 52
        },
        {
            textColor: 'black',
            url: 'http://www.zudusilatvija.lv/static//images/cluster.png',
            height: 52,
            width: 52
        }
    ];
    var mcOptions = {gridSize: 50, maxZoom: minClusterZoom, zoomOnClick: true, styles: clusterStyles};
    map = new google.maps.Map(document.getElementById('mission2pco-area-map'), mapOptions);
    infoWindow = new google.maps.InfoWindow({size: new google.maps.Size(150, 50)});
    geocoder = new google.maps.Geocoder();
    //geocodeString(area); -- NOt working
    mc = new MarkerClusterer(map, searchMarker, mcOptions);
    oms = new OverlappingMarkerSpiderfier(map,
            {markersWontMove: true, markersWontHide: true});
    google.maps.event.addListener(mc, 'clusterclick', function (cluster) {

        if (cluster.getMarkers().length === 2) {
            map.fitBounds(cluster.getBounds()); // Fit the bounds of the cluster clicked on
            if (map.getZoom() > minClusterZoom + 1) // If zoomed in past 15 (first level without clustering), zoom out to 15
                map.setZoom(minClusterZoom + 1);


        }
    });
    oms.addListener('spiderfy', function (markers) {
    });
    oms.addListener('unspiderfy', function (markers) {
    });

    google.maps.event.addListener(map, 'zoom_changed', function () {
        var northEast = new google.maps.LatLng(19.648699380876213, 126.63329394531274);
        var southWest = new google.maps.LatLng(5.344441440480007, 115.39702050781239);
        var philBounds = new google.maps.LatLngBounds(southWest, northEast);
        if (map.getZoom() === 6) {
            zoomChanged(philBounds);
        }
    });
}

function geocodeSuccess(result) {
    map.fitBounds(result.geometry.viewport);
    var northEast = new google.maps.LatLng(19.648699380876213, 126.63329394531274);
    var southWest = new google.maps.LatLng(5.344441440480007, 115.39702050781239);
    var philBounds = new google.maps.LatLngBounds(southWest, northEast);
    google.maps.event.addListener(map, 'zoom_changed', function () {

        if (map.getZoom() === 6) {
            zoomChanged(philBounds);
        }
    });
}

function zoomChanged(philBounds) {
    // Listen for the dragend event
    var northEast = new google.maps.LatLng(19.648699380876213, 126.63329394531274);
    var southWest = new google.maps.LatLng(5.344441440480007, 115.39702050781239);
    philBounds = new google.maps.LatLngBounds(southWest, northEast);
    // Listen for the dragend event
    google.maps.event.addListener(map, 'center_changed', function () {
        if (philBounds.contains(map.getCenter()))
            return;
        // We're out of bounds - Move the map back within the bounds
        var c = map.getCenter(),
                x = c.lng(),
                y = c.lat(),
                maxX = philBounds.getNorthEast().lng(),
                maxY = philBounds.getNorthEast().lat(),
                minX = philBounds.getSouthWest().lng(),
                minY = philBounds.getSouthWest().lat();

        if (x < minX)
            x = minX;
        if (x > maxX)
            x = maxX;
        if (y < minY)
            y = minY;
        if (y > maxY)
            y = maxY;

        map.setCenter(new google.maps.LatLng(y, x));
    });
}
//For Tooltip of Edit and Delete Entity
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

//Load Markers based on search

function createSearchMarker() {
    var greenPin = "5BB85D";
    var yellowPin = "E6E600";
    var orangePin = "EFAD4D";
    var redPin = "D9544F";

    var marker;
    var icon;
    var ids;
    for (var x = 0; x < excerptList.length; x++) {
        var pos = new google.maps.LatLng(excerptList[x].area.lat, excerptList[x].area.lng);
        var text = excerptList[x].text;
        ids = excerptList[x].id;

        switch (excerptList[x].strength) {
            case 100:
                icon = setMarkerColor(redPin);
                break;
            case 60:
                icon = setMarkerColor(orangePin);
                break;
            case 40:
                icon = setMarkerColor(yellowPin);
                break;
        }

        marker = new google.maps.Marker({
            position: pos,
            map: map,
            id: ids,
            icon: icon
        });
        setWindowListener(marker, "Excerpt " + excerptList[x].id + ": " + excerptList[x].text);
        oms.addMarker(marker);
        mc.addMarker(marker);
        setMarkerListener(marker);
        searchMarker.push(marker);
    }
}

function setMarkerListener(marker) {
    var greenPin = "5BB85D";
    google.maps.event.addListener(marker, 'rightclick', function (event) {
        var add = true;
        for (var x = 0; x < selectedMarker.length; x++) {
            if (selectedMarker[x].id == marker.id)
                add = false;
        }
        if (add) {
            selectedMarker.push(marker);
            marker.setIcon(setMarkerColor(greenPin));
        }
    });
}

//Create Entity Function

function loadEntity() {
    console.log(entity);
    var table = document.getElementById("mission-entities");
    $(table).find("tr:gt(0)").remove();
    for (var x = 0; x < entity.length; x++) {
        var trEntity = document.createElement("tr");
        trEntity.innerHTML = "<h5 style='padding-left:1vw'><b>" + entity[x].name + "</b></h5>";
        trEntity.style.borderBottom = "solid 1px #D3D3D3";
        trEntity.style.padding = "5px";
        trEntity.style.margin = "10px";
        for (var y = 0; y < entity[x].excrList.length; y++) {
            var trExcerpt = document.createElement("tr");
            var tdExcerpt = document.createElement("td");
            tdExcerpt.style.paddingLeft = "25px";
            tdExcerpt.style.paddingBottom = "5px";
            tdExcerpt.style.color = "#202020";
            tdExcerpt.innerHTML = "<b>Excerpt " + entity[x].excrList[y].id + ":</b> " + entity[x].excrList[y].text;
            trExcerpt.appendChild(tdExcerpt);
            trEntity.appendChild(trExcerpt);
        }
        table.appendChild(trEntity);
    }
}
var entityExcerptList = [];
function createEntity() {
    var modal = $('#entityModal');
    document.getElementById("entityModalLabel").innerHTML = "Create Entity";
    $('#entity-name').val("");
    entityExcerptList = [];

    var table = document.getElementById("excerpt-list");
    $(table).find("tr:gt(0)").remove();


    for (var x = 0; x < selectedMarker.length; x++) {
        for (var y = 0; y < excerptList.length; y++) {
            if (selectedMarker[x].id == excerptList[y].id)
                entityExcerptList.push(excerptList[y]);
        }
    }
    console.log(entityExcerptList);
    for (var x = 0; x < entityExcerptList.length; x++) {
        var tr = document.createElement("tr");
        tr.innerHTML = "Excerpt " + entityExcerptList[x].id + ": " + entityExcerptList[x].text;
        table.appendChild(tr);
    }
    modal.modal('show');
    $("#cancel-entity-btn").click(function () {
        setMarkersOnMap(null, searchMarker);
        setMarkersOnMap(null, selectedMarker);
        mc.clearMarkers();
        selectedMarker = new Array();
        createSearchMarker();
        modal.modal('hide');
    });
}

function saveEntity() {
    $('#entityModal').modal('hide');
    if (entityExcerptList.length != 0) {
        var entityObject = {id: entityCounter, name: $('#entity-name').val(), class: 1, excrList: entityExcerptList};
        entity.push(entityObject);
        entityCounter++;
        setMarkersOnMap(null, searchMarker);
        setMarkersOnMap(null, selectedMarker);
        mc.clearMarkers();
        selectedMarker = new Array();
        createSearchMarker();
        loadEntity();
        assignDoesUses(entityObject.id);
    }
    else {
        showAndDismissAlert("danger", "<strong>Failed! </strong> You do not have any excerpts to this Entity");
    }
}

function assignDoesUses(id) {
    var modal = $('#doesUsesModal');
    var table = document.getElementById("does-uses-table");
    $(table).find("tr:gt(0)").remove();

    var tr1, tr2, td1, td2, td3, td4;
    var label1, input1, label2, input2;

    //Does
    tr1 = document.createElement("tr");
    td1 = document.createElement("td");
    td2 = document.createElement("td");

    label1 = document.createElement("label");
    label1.innerHTML = "Does the <b>" + missionThreat + "</b> execute/practice/conduct <b>" + entity[id].name + "</b>?";
    label1.style.fontWeight = "100";
    td1.appendChild(label1);
    input1 = document.createElement("input");
    input1.id = "does" + entity[id].id;
    input1.type = "checkbox";
    input1.setAttribute("data-toggle", "toggle");
    td2.appendChild(input1);
    $(function () {
        $(input1).bootstrapToggle({
            on: 'Yes',
            off: 'No',
            onstyle: "success",
            offstyle: "default",
            width: "70",
            size: "small"
        });

    });
    tr1.appendChild(td1);
    tr1.appendChild(td2);

    //Uses
    tr2 = document.createElement("tr");
    td3 = document.createElement("td");
    td3.style.marginTop = "10px";
    td4 = document.createElement("td");
    td4.style.marginTop = "10px";
    label2 = document.createElement("label");
    label2.innerHTML = "Does the <b>" + missionThreat + "</b> make use of/utilize/take advantage of <b>" + entity[id].name + "</b>?";
    label2.style.fontWeight = "100";
    td3.appendChild(label2);
    input2 = document.createElement("input");
    input2.id = "uses" + entity[id].id;
    input2.type = "checkbox";
    input2.setAttribute("data-toggle", "toggle");
    td4.appendChild(input2);
    $(function () {
        $(input2).bootstrapToggle({
            on: 'Yes',
            off: 'No',
            onstyle: "success",
            offstyle: "default",
            width: "70",
            size: "small"
        });

    });
    tr2.appendChild(td3);
    tr2.appendChild(td4);

    table.appendChild(tr1);
    table.appendChild(tr2);
    modal.modal('show');
}

function saveDoesUses() {
    alert($('#does' + (entityCounter - 1)).prop('checked'));
    alert($('#uses' + (entityCounter - 1)).prop('checked'));
    if ($('#does' + (entityCounter - 1)).prop('checked') == true && $('#uses' + (entityCounter - 1)).prop('checked') == true) {
        entity[entityCounter - 1].class = 2;
        $('#doesUsesModal').modal('hide');
    }
    else if ($('#does' + (entityCounter - 1)).prop('checked') == true && $('#uses' + (entityCounter - 1)).prop('checked') == false) {
        entity[entityCounter - 1].class = 3;
        $('#doesUsesModal').modal('hide');
    }
    else if ($('#does' + (entityCounter - 1)).prop('checked') == false && $('#uses' + (entityCounter - 1)).prop('checked') == true) {
        entity[entityCounter - 1].class = 4;
        $('#doesUsesModal').modal('hide');
    }
    else if ($('#does' + (entityCounter - 1)).prop('checked') == false && $('#uses' + (entityCounter - 1)).prop('checked') == false) {
        proceed = false;
        showAndDismissAlert("danger", "Please complete Does/Uses for <strong>" + entity[entityCounter - 1].name + "</strong>");
    }
    console.log(entity);
}

function assignCrCv(id) {
    var modal = $('#crcvModal');
    var table = document.getElementById("cr-cv-table");
    $(table).find("tr:gt(0)").remove();
    var crCounter = 0;
    for (var x = 0; x < entity.length; x++) {
        if (entity[x].class == 4) {
            var tr, td1, td2, input1;
            //create TR
            tr = document.createElement("tr");
            tr.style.borderBottom = "solid 1px #D3D3D3";
            tr.style.padding = "5px";
            tr.style.margin = "3px";

            //create TD
            td1 = document.createElement("td");
            td2 = document.createElement("td");

            //center toggle buttons
            td2.style.textAlign = "center";
            td2.style.padding = "5px";

            //content for each td
            //td1
            td1.innerHTML = entity[x].name;

            //td2
            input1 = document.createElement("input");
            input1.id = "vulnerable" + entity[x].id;
            input1.type = "checkbox";
            input1.setAttribute("data-toggle", "toggle");
            td2.appendChild(input1);
            $(function () {
                $(input1).bootstrapToggle({
                    on: 'Yes',
                    off: 'No',
                    onstyle: "success",
                    offstyle: "default",
                    width: "70",
                    size: "small"
                });

            });

            tr.appendChild(td1);
            tr.appendChild(td2);
            table.appendChild(tr);
            crCounter++;
        }
    }
    if (crCounter > 0)
        modal.modal('show');
    else {
        showAndDismissAlert("danger", "You do not have a <strong>Critical Requirement</strong>. Please look for more data.")
    }
}

function saveCrCv() {
    for (var x = 0; x < entity.length; x++) {
        if (entity[x].class == 4) {
            if ($('#vulnerable' + entity[x].id).prop('checked') == true) {
                entity[x].class = 5;
            }
        }
    }
    var proceed = false;
    for (var x = 0; x < entity.length; x++) {
        if (entity[x].class == 5) {
            proceed = true;
        }
    }
    if(!proceed)
        showAndDismissAlert("danger", "You cannot proceed without a <strong> Critical Vulnerability </strong> ");
    else{
        if(unusedKeywords.length != 0){
            $('#keywordModal').modal('show');
        }
        else{
            $('#crcvModal').modal('hide');
            savePCO();
        }
    }
    
}


function setMarkersOnMap(map, excerptMarker) {

    for (var x = 0; x < excerptMarker.length; x++) {
        excerptMarker[x].setMap(map);
    }
}

function setWindowListener(marker, text) {
    google.maps.event.addListener(marker, 'mouseover', function () {
        infoWindow.setContent(text);
        infoWindow.open(map, this);
    });
    google.maps.event.addListener(marker, 'mouseout', function () {
        infoWindow.setContent(text);
        infoWindow.close(map, this);
    });
}


function setMarkerColor(color) {
    var iconColor = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color,
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34));
    return iconColor;
}

function savePCO() {
    if (entity.length == 0)
        showAndDismissAlert("danger", "You have not created a <strong> single Entity. </strong>");
    else if (entity.length < 4)
        showAndDismissAlert("warning", "You do not have<strong> enough entities </strong>to proceed. Consider searching for more data.");
    else {
        $.ajax({
            type: "GET",
            url: "Save2PCO",
            data: {
                entityArr: "working"//toJSON(entity)
            },
            success: function (response) {
                console.log("success");
                showAndDismissAlert("success", "<strong>Characteristics Overlay</strong> has been <strong>saved.</strong>");
                setTimeout(function () {
                    window.location.assign("ANMission3COG?id=" + missionID)
                }, 3000);
            }
        });
    }

}

function loadAreaSlider() {
    // define a lookup for what text should be displayed for each value in your range
    var lastLevel;
    var proceed = true;
    if (level1 == "null" && proceed) {
        lastLevel = 1;
        proceed = false;
    }
    if (level2 == "null" && proceed) {
        lastLevel = 2;
        proceed = false;
    }
    if (level3 == "null" && proceed) {
        lastLevel = 3;
        proceed = false;
    }
    if (level4 == "null" && proceed) {
        lastLevel = 4;
        proceed = false;
    }
    if (level5 == "null" && proceed) {
        lastLevel = 5;
        proceed = false;
    }
    if (level6 == "null" && proceed) {
        lastLevel = 6;
        proceed = false;
    }
    if (level7 == "null" && proceed) {
        lastLevel = 7;
        proceed = false;
    }
    if (level8 == "null" && proceed) {
        lastLevel = 8;
        proceed = false;
    }

    var rangeValues =
            {
                "1": level1,
                "2": level2,
                "3": level3,
                "4": level4,
                "5": level5,
                "6": level6,
                "7": level7,
                "8": level8
            };

    $('#areaRangeInput').attr("value", lastLevel - 1);
    $(function () {
        $('#areaRangeInput').attr("value", lastLevel - 1);
        $('#areaRangeText').text("Search Area Range: " + rangeValues[$('#areaRangeInput').val()]);
        // setup an event handler to set the text when the range value is dragged (see event for input) or changed (see event for change)
        $('#areaRangeInput').change(function () {
            if (rangeValues[$('#areaRangeInput').val()] != "null")
                $('#areaRangeText').text("Search Area Range: " + rangeValues[$('#areaRangeInput').val()]);
            else {
                $('#areaRangeText').text("No Area Level Found");
            }

        });

    });
}

function displayKeywords(value) {
    $('#unused-keyword').tagsinput('removeAll');
    $('#used-keyword').tagsinput('removeAll');

    for (var x = 0; x < unusedKeywords.length; x++) {
        if (unusedKeywords[x] == value) {
            unusedKeywords.splice(x, 1);
            usedKeywords.push(value);
        }
    }
    for (var x = 0; x < unusedKeywords.length; x++) {
        $('#unused-keyword').tagsinput('add', unusedKeywords[x]);
    }
    for (var x = 0; x < usedKeywords.length; x++) {
        $('#used-keyword').tagsinput('add', usedKeywords[x]);
    }


}