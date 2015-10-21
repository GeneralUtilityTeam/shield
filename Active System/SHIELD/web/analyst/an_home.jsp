<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>SHIELD: Decision Support System</title>

        <!--Bootstrap-->
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

        <!--Data Table-->
        <link rel="stylesheet" href="https://cdn.datatables.net/1.10.9/css/dataTables.bootstrap.min.css">
        <script src="https://cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>
        <script src="https://cdn.datatables.net/1.10.9/js/dataTables.bootstrap.min.js"></script>

        <!--Layout-->
        <link href="css/layout.css" rel="stylesheet" type="text/css">
        <link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>

        <!--General Scripts-->
        <script src="js/util.js"></script>
        <script src="js/alert.js"></script>

        <!--Page Script-->
        <script src="analyst/pagescripts/an_home.js"></script>

        <!--Google Map-->
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
        <script>
            //Global Variables
            var address;
            var area;
            var latLng;
            var switchString; //boolean; true if a string was used, false if a click was used
            var userFullName = '<%=session.getAttribute("userFullName")%>';

            //Map Variables
            var geocoder = new google.maps.Geocoder();
            var infowindow = new google.maps.InfoWindow({size: new google.maps.Size(150, 50)});
            var map;
            var marker;
        </script>
        <style>
            a[href^="http://maps.google.com/maps"]{display:none !important}
            a[href^="https://maps.google.com/maps"]{display:none !important}

            .gmnoprint a, .gmnoprint span, .gm-style-cc {
                display:none;
            }
            .gmnoprint div {
                background:none !important;
            }
        </style>

    </head>
    <body onload="initialize()">

        <!--Navigation Bar-->
        <script src="js/navigation.js"></script>

        <div id="container-fluid">

            <ul id="myTab" class="nav nav-tabs" style="margin-left: 1.5vw; margin-right: 1.5vw">
                <li class="active">
                    <a href="#mission-status" data-toggle="tab">
                        Mission Status
                    </a>
                </li>
                <li><a data-toggle="modal" data-target="#beginMission">Begin New Mission</a></li>
            </ul>
            <div id="content-shield" style="border-top: none; height: 82vh;">
                <div id="myTabContent" class="tab-content">

                    <div class="tab-pane fade in active" id="mission-status">
                        <h4 style="font-weight: 700; text-align: center;">MY ONGOING MISSIONS</h4>
                        <table id="mission-table" class="table table-hover table-bordered list-table" cellspacing="0" width="100%">
                            <thead style="background-color: #D3D3D3;">
                                <tr>
                                    <th width="20%">Mission Title</th>
                                    <th width="55%">Area of Operation</th>
                                    <th width="25%">Progress</th>
                                </tr>
                            </thead>

                            <tbody id="mission-table-body">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Begin Mission Modal -->
        <div class="modal fade" id="beginMission" tabindex="-1" role="dialog" 
             aria-labelledby="beginMissionlabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" 
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            Begin New Mission
                        </h4>
                    </div>
                    <div class="modal-body">
                        <table id="begin-mission-table" style="width: 100%;">
                            <tr">
                                <td style="width: 100px;" >
                                    <h5 style="margin-bottom: 10px;">Mission Title:  </h5>
                                </td>
                                <td>
                                    <input style="margin-bottom: 10px;" type="text" id="mission-title" class="form-box" placeholder="Enter Mission Title"required>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h5>Mission Area:  </h5>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="text" id="address" class="form-control" placeholder="Search for an Area"required>
                                        <span class="input-group-btn">
                                            <button class="btn btn-default" type="button" value="Search Area" onclick="addressSearch()">
                                                Locate Area
                                            </button>
                                        </span>
                                    </div><!-- /input-group -->
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div id="mission-area-map" style="margin-bottom: 10px;">
                                    </div>
                                </td>
                            </tr>

                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" onclick="beginMission()" class="btn btn-success"><span class="glyphicon glyphicon-saved"> </span>
                            Begin Mission
                        </button>
                        <button type="button" class="btn btn-default" 
                                data-dismiss="modal">Close
                        </button>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <div class="alert-messages text-center">
        </div>
    </body>
</html>
