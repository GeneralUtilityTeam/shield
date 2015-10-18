var entityCC = [];
var mapOptions;
var geocoder;
var map;
var zoom;
var oms;
var infoWindow;
var mc;
var minClusterZoom = 19;
var markers = [];
var entityMarker = [];

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "GetCCOfMission",
        data: {
            missionID: missionID
        },
        success: function (responseJSON) {
            entityCC = responseJSON;
            initialize();
        }
    });
});
function initialize() {
    //replace first parameter with Mission Status - msonJSOB.status
    buildNav(missionStatus, 4);
    initializeMap();

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
        if (entityCC[x].from != null && entityCC[x].to != null) {
            panelBody.innerHTML += " from: <input type='date' onchange='to" + x + ".focus()' id='from" + x + "' class='form-box' style='width:42%;' value='" + entityCC[x].from + "'> to: <input type='date' onchange='from" + (x + 1) + ".focus()' id='to" + x + "' class='form-box' style='width:42%;' value='" + entityCC[x].to + "'><br>";
        }
        else {
            panelBody.innerHTML += " from: <input type='date' onchange='to" + x + ".focus()' id='from" + x + "' class='form-box' style='width:42%;'> to: <input type='date' onchange='from" + (x + 1) + ".focus()' id='to" + x + "' class='form-box' style='width:42%;'><br>";
        }
        if (entityCC[x].lat == 0 && entityCC[x].lng == 0) {
            panelBody.innerHTML += " at: <input type='text' id='at" + x + "' class='form-box' style='width:94%; margin-top: 10px; padding-right:0;' disabled value=''><br>";
            createCCEntityMarker(entityCC[x], x);
        }
        else {
            panelBody.innerHTML += " at: <input type='text' id='at" + x + "' class='form-box' style='width:94%; margin-top: 10px; padding-right:0;' disabled value=''><br>";
            createCCEntityMarker(entityCC[x], x);
        }
        panelBody.innerHTML += "<h7>Show Excerpts of Entities:</h7><br>";
        panelBody.innerHTML += "<div class='checkbox'><label class='checkbox-inline' style='color:#CC0000'><input id='checkCC" + id + "' type='checkbox' value=''>Critical Capability</label> <i class='fa fa-map-marker fa-lg' style='color:#CC0000'></i></div>";
        panelBody.innerHTML += "<div class='checkbox'><label class='checkbox-inline' style='color:#5394ed'><input id='checkCR" + id + "' type='checkbox' value=''>Critical Requirement</label> <i class='fa fa-map-marker fa-lg' style='color:#5394ed'></i></div>";
        panelBody.innerHTML += "<div class='checkbox'><label class='checkbox-inline' style='color: #FFC200'><input id='checkCV" + id + "' type='checkbox' value=''>Critical Vulnerability</label> <i class='fa fa-map-marker fa-lg' style='color:#FFC200'></i></div>";

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

    map = new google.maps.Map(document.getElementById('mission4tcoa-area-map'), mapOptions);
    infoWindow = new google.maps.InfoWindow({size: new google.maps.Size(150, 50), disableAutoPan: true});
    geocoder = new google.maps.Geocoder();

    oms = new OverlappingMarkerSpiderfier(map,
            {markersWontMove: true, markersWontHide: true});

    oms.addListener('spiderfy', function (markers) {
    });
    oms.addListener('unspiderfy', function (markers) {
    });

//    var clusterStyles = [
//        {
//            textColor: 'black',
//            url: 'http://www.zudusilatvija.lv/static//images/cluster.png',
//            height: 52,
//            width: 52
//        },
//        {
//            textColor: 'black',
//            url: 'http://www.zudusilatvija.lv/static//images/cluster.png',
//            height: 52,
//            width: 52
//        },
//        {
//            textColor: 'black',
//            url: 'http://www.zudusilatvija.lv/static//images/cluster.png',
//            height: 52,
//            width: 52
//        }
//    ];
//    var mcOptions = {gridSize: 50, maxZoom: minClusterZoom, zoomOnClick: true, styles: clusterStyles};
//    mc = new MarkerClusterer(map, markers, mcOptions);
//    google.maps.event.addListener(mc, 'clusterclick', function (cluster) {
//        if (cluster.getMarkers().length === 2) {
//            map.fitBounds(cluster.getBounds()); // Fit the bounds of the cluster clicked on
//            if (map.getZoom() > minClusterZoom + 1) // If zoomed in past 15 (first level without clustering), zoom out to 15
//                map.setZoom(minClusterZoom + 1);
//        }
//    });

    google.maps.event.addListener(map, 'zoom_changed', function () {
        var northEast = new google.maps.LatLng(19.648699380876213, 126.63329394531274);
        var southWest = new google.maps.LatLng(5.344441440480007, 115.39702050781239);
        var philBounds = new google.maps.LatLngBounds(southWest, northEast);
        if (map.getZoom() === 6) {
            zoomChanged(philBounds);
        }
    });
}

function geocodeResultStringTCOA(str, i) { // Takes String Address; Returns geocode results
    geocoder.geocode({
        'address': str
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            geocodeSuccess(results[0], i);
        } else {
            return null;
        }
    });
}

function geocodeSuccess(result, i) {
    var area = generateAreaObject(result);
    document.getElementById("at" + i).value = generateFullAddress(area);
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

function createCCMarker(excerptList) {
    var markersArr = [];
    var redPin = "CC0000";
    var bluePin = "5394ed";
    var yellowPin = "FFC200";

    var marker;
    var icon;
    var ids;
    for (var x = 0; x < excerptList.length; x++) {
        var pos = new google.maps.LatLng(excerptList[x].area.lat, excerptList[x].area.lng);
        var text = excerptList[x].text;
        ids = excerptList[x].id;

        switch (excerptList[x].eentityClassID) {
            case 3:
                icon = setMarkerColor(redPin);
                break;
            case 4:
                icon = setMarkerColor(bluePin);
                break;
            case 5:
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
//        mc.addMarker(marker);
        markers.push(marker);
        setMapOnAll(null);
        markersArr.push(marker);
    }

    return markersArr;
}

function createCCEntityMarker(entityCC, i) {

    var marker;
    var icon = "http://maps.google.com/mapfiles/kml/shapes/target.png";
    var ids = entityCC.id;
    if (entityCC.lat == 0 && entityCC.lng == 0) {
        var bounds = new google.maps.LatLngBounds();
        for (var x = 0; x < entityCC.excrList.length; x++) {
            bounds.extend(new google.maps.LatLng(entityCC.excrList[x].area.lat, entityCC.excrList[x].area.lng));
        }
        
        var latlngString = bounds.getCenter().toString();
        geocodeResultStringTCOA(latlngString, i);
        marker = new google.maps.Marker({
            position: bounds.getCenter(),
            map: map,
            draggable: true,
            id: ids,
            icon: icon
        });
        google.maps.event.addListener(marker, 'dragend', function (evt) {
            latlngString = evt.latLng.lat().toFixed(5).toString() + ", " + evt.latLng.lng().toFixed(5).toString();
            geocodeResultStringTCOA(latlngString, i);
        });

        google.maps.event.addListener(marker, 'drag', function (evt) {
            latlngString = evt.latLng.lat().toFixed(5).toString() + ", " + evt.latLng.lng().toFixed(5).toString();
            geocodeResultStringTCOA(latlngString, i);
        });
    }
    else {
        var pos = new google.maps.LatLng(entityCC.lat, entityCC.lng);
        var latlngString = pos.toString();
        geocodeResultStringTCOA(latlngString, i);
        marker = new google.maps.Marker({
            position: pos,
            map: map,
            draggable: true,
            id: ids,
            icon: icon
        });
        google.maps.event.addListener(marker, 'dragend', function (evt) {
            latlngString = evt.latLng.lat().toFixed(5).toString() + ", " + evt.latLng.lng().toFixed(5).toString();
            geocodeResultStringTCOA(latlngString, i);
        });

        google.maps.event.addListener(marker, 'drag', function (evt) {
            latlngString = evt.latLng.lat().toFixed(5).toString() + ", " + evt.latLng.lng().toFixed(5).toString();
            geocodeResultStringTCOA(latlngString, i);
        });
    }


    setWindowListener(marker, toTitleCase(entityCC.name));
    oms.addMarker(marker);
    entityMarker.push(marker);
    setMapOnAll(null);
    setEntityMarkerOnMap(null, marker);
}

function setMarkersOnMap(map, excerptMarker) {
    for (var x = 0; x < excerptMarker.length; x++) {
        excerptMarker[x].setMap(map);
    }
}
function setEntityMarkerOnMap(map, marker) {
    marker.setMap(map);
}

function clearCCMarkers() {
    setMapOnAll(null);
    markers = [];
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
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
    var ccExcerpts = [];
    $.ajax({
        type: "GET",
        url: "GetExcerptOfCC",
        data: {
            ccID: id
        },
        success: function (responseJSON) {
            ccExcerpts = responseJSON;
        }
    });

    var cc = [], cr = [], cv = [];
    var ccMarker = [], crMarker = [], cvMarker = [];

    $(panel).on('show.bs.collapse', function () {

        for (var x = 0; x < entityMarker.length; x++) {
            if (entityMarker[x].id == id)
                setEntityMarkerOnMap(map, entityMarker[x]);
        }
        $('#checkCC' + id).prop("checked", false);
        $('#checkCR' + id).prop("checked", false);
        $('#checkCV' + id).prop("checked", false);

        cc.splice(0, cc.length);
        cr.splice(0, cr.length);
        cv.splice(0, cv.length);
        for (var x = 0; x < ccExcerpts.length; x++) {
            if (ccExcerpts[x].eentityClassID == 3)
                cc.push(ccExcerpts[x]);
            else if (ccExcerpts[x].eentityClassID == 4)
                cr.push(ccExcerpts[x]);
            else if (ccExcerpts[x].eentityClassID == 5)
                cv.push(ccExcerpts[x]);
        }

        ccMarker = createCCMarker(cc);
        crMarker = createCCMarker(cr);
        cvMarker = createCCMarker(cv);

        $('input:checkbox').change(function () {
            if ($('#checkCC' + id).prop("checked") == true && $('#checkCR' + id).prop("checked") == true && $('#checkCV' + id).prop("checked") == true) {
                setMapOnAll(null);
                var cccrcvMarker = [];
                for (var y = 0; y < ccMarker.length; y++) {
                    cccrcvMarker.push(ccMarker[y]);
                }
                for (var y = 0; y < crMarker.length; y++) {
                    cccrcvMarker.push(crMarker[y]);
                }
                for (var y = 0; y < cvMarker.length; y++) {
                    cccrcvMarker.push(cvMarker[y]);
                }
                setMarkersOnMap(map, cccrcvMarker);
            }
            else if ($('#checkCC' + id).prop("checked") == true && $('#checkCR' + id).prop("checked") == true) {
                setMapOnAll(null);
                var cccrMarker = [];
                for (var y = 0; y < ccMarker.length; y++) {
                    cccrMarker.push(ccMarker[y]);
                }
                for (var y = 0; y < crMarker.length; y++) {
                    cccrMarker.push(crMarker[y]);
                }
                setMarkersOnMap(map, cccrMarker);
            }
            else if ($('#checkCC' + id).prop("checked") == true && $('#checkCV' + id).prop("checked") == true) {
                setMapOnAll(null);
                var cccvMarker = [];
                for (var y = 0; y < ccMarker.length; y++) {
                    cccvMarker.push(ccMarker[y]);
                }
                for (var y = 0; y < cvMarker.length; y++) {
                    cccvMarker.push(cvMarker[y]);
                }
                setMarkersOnMap(map, cccvMarker);
            }
            else if ($('#checkCR' + id).prop("checked") == true && $('#checkCV' + id).prop("checked") == true) {
                setMapOnAll(null);
                var crcvMarker = [];
                for (var y = 0; y < cvMarker.length; y++) {
                    crcvMarker.push(cvMarker[y]);
                }
                for (var y = 0; y < crMarker.length; y++) {
                    crcvMarker.push(crMarker[y]);
                }
                setMarkersOnMap(map, crcvMarker);
            }
            else if ($('#checkCC' + id).prop("checked") == true) {
                setMapOnAll(null);
                setMarkersOnMap(map, ccMarker);
            }
            else if ($('#checkCR' + id).prop("checked") == true) {
                setMapOnAll(null);
                setMarkersOnMap(map, crMarker);
            }
            else if ($('#checkCV' + id).prop("checked") == true) {
                setMapOnAll(null);
                setMarkersOnMap(map, cvMarker);
            }
        });

    });

    $(panel).on('hide.bs.collapse', function () {
        setMarkersOnMap(null, entityMarker);
        setMarkersOnMap(null, markers);
        clearCCMarkers();
        $('#checkCC' + id).prop("checked", false);
        $('#checkCR' + id).prop("checked", false);
        $('#checkCV' + id).prop("checked", false);
    });

}



function saveTCOA() {
    var proceed = true;

    for (var x = 0; x < entityCC.length; x++) {
        var from = document.getElementById("from" + x).value;
        var to = document.getElementById("to" + x).value;
        var at = document.getElementById("at" + x).value;
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
        for (var y = 0; y < entityCC.length; y++) {
            entityCC[y].from = document.getElementById("from" + y).value;
            entityCC[y].to = document.getElementById("to" + y).value;
            entityCC[y].lat = entityMarker[y].position.lat();
            entityCC[y].lng = entityMarker[y].position.lng();
        }
        console.log(entityCC);
        $.ajax({
            type: "GET",
            url: "Save4TCOA",
            data: {
                ccList: toJSON(entityCC)
            },
            success: function (response) {
                showAndDismissAlert("success", "<strong>Threat Course of Action</strong> has been <strong>saved.</strong>");
                window.location.assign("ANMission5CM");
            }
        });
    }

}