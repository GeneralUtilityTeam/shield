<%-- 
    Document   : BeginMissionMaps
    Created on : 09 24, 15, 5:16:48 PM
    Author     : jasmi_000
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8">
        <title>Begin Mission</title>
        <style type="text/css">
            html, body {
                height: 100%;
                margin: 0;
                padding: 0;
            }

            #map_canvas {
                height: 50%;
            }

            /*            @media print {
                            html, body {
                                height: auto;
                            }*/

            #map_canvas {
                height: 400px;
            }

        </style>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
        <script>
            var geocoder;
            var map;
            var marker;
            var infowindow = new google.maps.InfoWindow({size: new google.maps.Size(150, 50)});
            var address;

            function initialize() {
                geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(14.5800, 121.000);
                var mapOptions = {
                    zoom: 13,
                    center: latlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
                google.maps.event.addListener(map, 'click', function () {
                    infowindow.close();
                });
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
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
                document.getElementById('address').addEventListener('keypress', function (e) {
                    var key = e.which || e.keyCode;
                    if (key === 13) {
                        codeAddress();
                    }
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
                    infowindow.setContent(marker.formatted_address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
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
                        alert('Geocode was not successful for the following reason: ' + status);
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

                var stringElements = JSON.stringify(mapElements);
                alert(stringElements);
                window.location.assign("SendElements?area=" + stringElements);
            }
            ;
        </script>
    </head>
    <body onload="initialize()">
        <div>
            <input id="address" type="textbox" value="Manila, Philippines">
            <!--            <input type="button" value="Geocode" onclick="codeAddress()">-->
        </div>
        <div id="map_canvas" style="height:50%;top:30px"></div>

        <div><p><button id="hello" onclick="saveElements()">Next Page</button></div>

    </body>
</html>
