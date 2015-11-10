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

        <!--Layout-->
        <link href="css/layout.css" rel="stylesheet" type="text/css">
        <link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>

        <!--General Scripts-->
        <script src="js/util.js"></script>
        <script  src="js/alert.js"></script>

        <!--Data Table-->
        <link rel="stylesheet" href="https://cdn.datatables.net/1.10.9/css/dataTables.bootstrap.min.css">
        <script src="https://cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>
        <script src="https://cdn.datatables.net/1.10.9/js/dataTables.bootstrap.min.js"></script>

        <!--Page Script-->
        <script src="encoder/pagescripts/en_source_view.js"></script>
        <link href="css/bootstrap-tagsinput.css" rel="stylesheet" type="text/css">
        <script  src="js/bootstrap-tagsinput.js"></script>

        <!--Google Map-->
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
        <script>
            //Global Variables
            var srcJSON = <%=request.getAttribute("srcJSON")%>;
            var ctgyJSON = <%=request.getAttribute("ctgyJSON")%>;
            var clssJSON = <%=request.getAttribute("clssJSON")%>;
            var sourceID = <%=session.getAttribute("sourceID")%>;
            var userFullName = '<%=session.getAttribute("userFullName")%>';
            var excrJSON;
            var address;
            var area;
            var latLng;
            var switchString; //boolean; true if a string was used, false if a click was used
            var excrTable;
            var versionExcrTable;
            var srcTable;
            var activeID;


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
        <script src="js/en_navigation.js"></script>

        <div id="container-fluid">
            <div id="content-shield" style="border-top: none;">
                <div class="col-md-12">
                    <a href="ENHome" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-arrow-left"></span> Back to List of Sources</a>
                    <button type="submit" class="btn btn-success btn-sm" data-toggle="modal" onclick="addExcerpt()" style="margin-right: 5px;" onclick="clearInput()"><span class="glyphicon glyphicon-plus"></span> Add Excerpt to Source</button>
                    <button type="submit" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#addVersion" onclick="clearInput()"><span class="glyphicon glyphicon-edit"></span> Add New Version</button>

                    <table class="table table-bordered table-hover list-table">
                        <thead style="background-color: #D3D3D3;">
                        <th style="width: 25%;">Type</th>
                        <th style="width: 30%;">Name</th>
                        <th style="width: 30%;">Description</th>
                        <th style="width: 15%;">Date Published</th>
                        </thead>
                        <tbody id="src-table">
                        </tbody>
                    </table>

                    <table id="src-excerpts" class="table table-bordered table-hover list-table" width="100%">
                        <thead style="background-color: #D3D3D3;">
                        <th>ID</th>
                        <th>Category</th>
                        <th>Text</th>
                        </thead>
                        <tbody id="src-excerpts-body">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       

        <!-- Add Excerpt Modal -->
        <div class="modal fade in" id="addExcerpt" tabindex="-1" role="dialog" 
             aria-labelledby="addExcerptlabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" 
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            Add New Excerpt
                        </h4>
                    </div>
                    <div class="modal-body">
                        <table>
                            <tr>
                                <td>
                                    <h5>Category:  </h5>
                                </td>
                                <td>
                                    <select id="input-excerpt-category" class="form-box" required>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h5>Excerpt Text:  </h5>
                                </td>
                                <td>
                                    <textarea id="input-excerpt-text" rows="4" cols="50" class="form-box" style="height: 70px; margin-top: 5px;" required placeholder="Enter Excerpt Text"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h5>Excerpt Area:  </h5>
                                </td>
                                <td>
                                    <div class="input-group" style="width: 100%; margin-bottom: 5px;" >
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

                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div style="height: 300px; width: 550px; margin-bottom: 10px;" id="source-view-map">
                                    </div></td>
                            </tr>                            
                            <tr>
                                <td>
                                    <h5>Tags:  </h5>
                                </td>
                                <td>
                                    <input id="input-excerpt-tags" type="text" data-role="tagsinput" class="form-box" required placeholder="Press Enter to Add Tag">
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="add-update-btn" class="btn btn-success"><span class="glyphicon glyphicon-saved"> </span>
                        </button>
                        <button type="button" class="btn btn-default" 
                                data-dismiss="modal">Close
                        </button>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div><!-- / Add Excerpt Modal-->

        <!-- View Excerpt Modal -->
        <div class="modal fade in" id="viewExcerpt" tabindex="-1" role="dialog" 
             aria-labelledby="viewExcerptlabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" 
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            View Excerpt
                        </h4>
                    </div>
                    <div class="modal-body scroll" style="max-height: 70vh; overflow: auto;">

                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title" id="excerpt-num">


                                </h4>
                            </div>
                            <div class="panel-body">
                                <blockquote id="view-excerpt-text"></blockquote>
                                <h5>Category: <label id="category"></label></h5>
                                <h5>Source: <label id="source"></label></h5>
                                <h5>Tags: <input id="enter-tags" type="text" data-role="tagsinput" class="form-box" disabled></h5>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="update-excerpt-button" class="btn btn-primary"><span class="glyphicon glyphicon-edit"> </span>
                            Update Excerpt
                        </button>

                        <button type="button" class="btn btn-default" 
                                data-dismiss="modal">Close
                        </button>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div><!-- /View Artifact Modal-->

        <!-- Update Source Modal -->
        <div class="modal fade in" id="updateSource" tabindex="-1" role="dialog" 
             aria-labelledby="updateSourcelabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" 
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            Update Source Details
                        </h4>
                    </div>
                    <div class="modal-body">
                        <table style="width: 90%;">
                            <tr>
                                <td><h5>Type: </h5></td>
                                <td><select id="source-type" required class="form-box"></select></td>
                            </tr>
                            <tr>
                                <td><h5>Name: </h5></td>
                                <td><input type="text" id="source-name" required class="form-box" placeholder="Enter Source Name"></td>
                            </tr>
                            <tr>
                                <td><h5>Description: </h5></td>
                                <td><input type="text" id="source-description" class="form-box" required placeholder="Enter Description"></td>
                            </tr>
                            <tr>
                                <td><h5>Date Published: </h5></td>
                                <td><input type="date" id="source-date" class="form-box" required></td>
                            </tr>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" onclick="saveSource()" class="btn btn-success"><span class="glyphicon glyphicon-saved"> </span>
                            Update Source Details
                        </button>
                        <button type="button" class="btn btn-default" 
                                data-dismiss="modal">Close
                        </button>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!-- Add Version of Source Modal -->
        <div class="modal fade in" id="addVersion" tabindex="-1" role="dialog" 
             aria-labelledby="addVersionlabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" 
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            Add New Version of Source
                        </h4>
                    </div>
                    <div class="modal-body">
                        <table style="width: 90%;">
                            <tr>
                                <td><h5>Type: </h5></td>
                                <td><input type="text" id="version-source-type" required class="form-box" placeholder="Enter Source Name" disabled></td>
                            </tr>
                            <tr>
                                <td><h5>Name: </h5></td>
                                <td><input type="text" id="version-source-name" required class="form-box" placeholder="Enter Source Name" disabled></td>
                            </tr>
                            <tr>
                                <td><h5>Description: </h5></td>
                                <td><input type="text" id="version-source-description" class="form-box" required placeholder="Enter Description"></td>
                            </tr>
                            <tr>
                                <td><h5>Date Published: </h5></td>
                                <td><input type="date" id="version-source-date" class="form-box" required></td>
                            </tr>
                        </table>
                        <br>
                        <label>Please select Excerpts to keep: </label>
                        <table id="version-src-excerpts" class="table table-bordered table-hover list-table" width="100%">
                            <thead style="background-color: #D3D3D3;">
                            <th>ID</th>
                            <th>Category</th>
                            <th>Text</th>
                            <th>Include</th>
                            </thead>
                            <tbody id="version-src-excerpts-body">
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" onclick="saveVersion()" class="btn btn-success" data-dismiss="modal"><span class="glyphicon glyphicon-saved"> </span>
                            Add New Version
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
