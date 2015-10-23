<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>PCO</title>

        <!--Bootstrap-->

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
   
        <!--Map Script-->
        <script src="https://maps.googleapis.com/maps/api/js?sensor=false&libraries=drawing,geometry,places&ext=.js"></script>
        <script src="../js/oms.js"></script>
		<script src="https://google-maps-utility-library-v3.googlecode.com/svn/tags/markerwithlabel/1.1.9/src/markerwithlabel.js"></script>
        	<style>
			@media print{
				@page{
					margin: 0;
					size: landscape;
				}
				
			}
			.labels {
					color: white;
					background-color: red;
					font-family: "Lucida Grande", "Arial", sans-serif;
					font-size: 14px;
					font-weight:bold;
					text-align: center;
					width: 20px;     
					white-space: nowrap;
				}
			</style>
		
		<script text="text/javascript">
	
		
		
		var hiddenMap;
		var omsHidden;
		var hiddenMapOptions;
		var randomExcerpt =[{"lat": 6.766268699999999,"lng": 125.32842690000007, "categoryID": 1},{"lat": 6.7431794,"lng":125.35808559999998,"categoryID": 2},{"lat": 6.7417283, "lng": 125.3570052,"categoryID": 3},{"lat": 6.738792999999999, "lng": 125.35126000000002, "categoryID": 4},{"lat": 6.73794160, "lng": 125.36708939, "categoryID": 5},{"lat": 6.73061119, "lng": 125.37095729,"categoryID": 6},{"lat": 6.73061119, "lng": 125.37095729,"categoryID": 7}];
		var hiddenMarkerArr = [];
		
		function initializeHiddenMap(){
			hiddenMapOptions = {
				center: new google.maps.LatLng(6.766268699999999, 125.32842690000007),
				zoom: 7,
				minZoom: 6,
				maxZoom: 7,
				mapTypeId: google.maps.MapTypeId.ROADMAP

			};
			
			hiddenMap = new google.maps.Map(document.getElementById('hidden-map'), hiddenMapOptions);
			
			omsHidden = new OverlappingMarkerSpiderfier(hiddenMap,
            {markersWontMove: true, markersWontHide: true, keepSpiderfied: true, nearbyDistance: 35});
			
			createHiddenMarker();
		
		}
		
		function createHiddenMarker() {
			var latlngHidden;
			var p = "P";
            var m = "M";
            var ec = "EC";
            var ep = "EP";
            var inf = "IN";
            var inte = "IT";
            var s = "S";
            var hiddenMarker;
            var labelString;
			var category;
			
			
						
		for(var x = 0; x<randomExcerpt.length; x++){
			latlngHidden = new google.maps.LatLng(randomExcerpt[x].lat, randomExcerpt[x].lng);
			console.log(latlngHidden);
			category = randomExcerpt[x].categoryID;
			
			switch (category) {
                            case 1:
                                labelString = p;
                                break;
                            case 2:
                                labelString = m;
                                break;
                            case 3:
                                labelString = ec;
                                break;
                            case 4:
                                labelString = s;
                                break;
                            case 5:
                                labelString = inf;
                                break;
                            case 6:
                                labelString = inte;
                                break;
                            case 7:
                                labelString = ep;
                                break;
                        }
						

                        hiddenMarker = new MarkerWithLabel({
                            position: latlngHidden,
                            map: hiddenMap,
                            labelContent: labelString,
                            labelAnchor: new google.maps.Point(10, 34),
                            labelClass: "labels",
							labelInBackground: false
                        });
						
                        omsHidden.addMarker(hiddenMarker);
						hiddenMarkerArr.push(hiddenMarker);
                    }
					
					
					
					setTimeout('openAllHiddenClusters()', 1000);
				}

					function openAllHiddenClusters() {
						var hmarkers = omsHidden.markersNearAnyOtherMarker();
						$.each(hmarkers, function (i, marker) {
							google.maps.event.trigger(hmarkers[i], 'click');
						});
					}		

					function printThis(){
					var divElements = document.getElementById('print-div').innerHTML;
					var oldPage = document.body.innerHTML;
					
					var reportHTML = "<html><head><title></title></head><body><table>";
					reportHTML += "<tr><td>" + "Mission PCO" + "</td></tr>";
					reportHTML += "<tr><td>" + "Mission Area: Some area" + "</td></tr>";
					reportHTML += "<tr><td>" + "Mission PCO" + "</td></tr>";
					reportHTML += "<tr><td>" + divElements + "</td></tr>";
					reportHTML += "<tr><td>" + "Data Gathered" + "</td></tr>";
					reportHTML += "<tr><td>" +  "Political" + "</td></tr>";
					reportHTML += "<tr><td>" +  "Military and Security" + "</td></tr>";
					reportHTML += "<tr><td>" +  "Economic" + "</td></tr>";
					reportHTML += "<tr><td>" +  "Social" + "</td></tr>";
					reportHTML += "<tr><td>" +  "Information "+ "</td></tr>";
					reportHTML += "<tr><td>" +  "Infrastructure and Technology "+ "</td></tr>";
					reportHTML += "<tr><td>" +  "Environmental and Physical" + "</td></tr>";
					reportHTML += "</table></body>";
					
					document.body.innerHTML = reportHTML;
					window.print();
					document.body.innerHTML = oldPage;
					
					}

		</script>
	</head>
	<body onload = "initializeHiddenMap()">
		<div id="print-div"><div id="hidden-map" style="height: 500px; width: 500px;"></div></div><br>
		<input type="button" id="print-this" onclick="printThis()" value="Print"/>
	</body>