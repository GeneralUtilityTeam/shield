var entity;
var entityCC = [];
var mapOptions;
var geocoder;
var map;
var zoom;
var oms;
var infoWindow;
var mc;
var minClusterZoom = 19;

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "GetCCOfMission",
        data: {
            missionID: missionID
        },
        success: function (responseJSON) {
            entity = responseJSON;
            initialize();
        }
    });
});
function initialize() {
    //replace first parameter with Mission Status - msonJSOB.status
    buildNav(missionStatus, 4);
    initializeMap();

    for (var x = 0; x < entity.length; x++) {
        if (entity[x].classID == 3)
            entityCC.push(entity[x]);
    }

    var collapse = document.getElementById("accordion");
    for (var x = 0; x < entityCC.length; x++) {
        //Panel Element
        var id = entityCC[x].id;
        var panel = document.createElement("div");
        panel.className = "panel panel-default";
        panel.id = "panel" + id;

        //Panel Header
        var panelHead = document.createElement("div");
        panelHead.className = "panel-heading";
        panelHead.id = "panelHead" + id;
        panelHead.setAttribute("data-toggle", "collapse");
        panelHead.setAttribute("data-parent", "#accordion");
        panelHead.setAttribute("href", "#collapse" + id);
        panelHead.innerHTML = "<h5>Critical Capability " + (x + 1) + ": <b>" + toTitleCase(entityCC[x].name) + "</b></h5>";

        //Panel Collapse
        var panelCollapse = document.createElement("div");
        panelCollapse.className = "panel-collapse collapse";
        panelCollapse.id = "collapse" + id;
        assignListener(panelCollapse, id);

        //Panel Body
        var panelBody = document.createElement("div");
        panelBody.className = "panel-body";
        panelBody.id = "panelBody" + id;
        panelBody.innerHTML = "<p> Threat may launch/use/deploy <b>" + toTitleCase(entityCC[x].name) + "</b></p>";
        panelBody.innerHTML += " from: <input type='date' onchange='to" + x + ".focus()' id='from" + x + "' class='form-box' style='width:42%;'> to: <input type='date' onchange='from" + (x + 1) + ".focus()' id='to" + x + "' class='form-box' style='width:42%;'>";

        panelCollapse.appendChild(panelBody);
        panel.appendChild(panelHead);
        panel.appendChild(panelCollapse);
        collapse.appendChild(panel);
    }
}

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
    map = new google.maps.Map(document.getElementById('mission4tcoa-area-map'), mapOptions);
    infoWindow = new google.maps.InfoWindow({size: new google.maps.Size(150, 50), disableAutoPan: true});
    geocoder = new google.maps.Geocoder();
    //geocodeString(area); -- NOt working
    //mc = new MarkerClusterer(map, searchMarker, mcOptions);
    oms = new OverlappingMarkerSpiderfier(map,
            {markersWontMove: true, markersWontHide: true});
//    google.maps.event.addListener(mc, 'clusterclick', function (cluster) {
//        if (cluster.getMarkers().length === 2) {
//            map.fitBounds(cluster.getBounds()); // Fit the bounds of the cluster clicked on
//            if (map.getZoom() > minClusterZoom + 1) // If zoomed in past 15 (first level without clustering), zoom out to 15
//                map.setZoom(minClusterZoom + 1);
//        }
//    });
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
    var area = generateAreaObject(result);
    document.getElementById("address").value = generateFullAddress(area);
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

function assignListener(panel, id) {
    $(panel).on('show.bs.collapse', function () {
        alert(id);
    })
}

function saveTCOA() {
    var proceed = true;

    for (var x = 0; x < entityCC.length; x++) {
        var from = document.getElementById("from" + x).value;
        var to = document.getElementById("to" + x).value;
        if (from == "") {
            showAndDismissAlert("danger", "Please input <strong> from </strong> date in <strong> Critical Capability " + (x + 1) + "</strong>");
            proceed = false;
        }
        if (to == "") {
            showAndDismissAlert("danger", "Please input <strong> to </strong> date in <strong> Critical Capability " + (x + 1) + "</strong>");
            proceed = false;
        }
        if (from > to) {
            showAndDismissAlert("danger", "Invalid input for <strong> Critical Capability " + (x + 1) + "</strong>");
            proceed = false;
        }
    }

    if (proceed) {
        for (var x = 0; x < entity.length; x++) {
            for (var y = 0; y < entityCC.length; y++) {
                if (entity[x].id == entity[y].id) {
                    entity[x].from = document.getElementById("from" + y).value;
                    entity[x].to = document.getElementById("to" + y).value;
                }
            }
        }

        $.ajax({
            type: "GET",
            url: "Save4TCOA",
            data: {
                missionID: missionID,
                entityArr: toJSON(entity)
            },
            success: function (response) {
                showAndDismissAlert("success", "<strong>Threat Course of Action</strong> has been <strong>saved.</strong>");
                setTimeout(function () {
                    window.location.assign("ANMission5CM")
                }, 3000);
            }
        });
    }

}