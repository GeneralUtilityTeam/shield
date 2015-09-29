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

        <!--Page Script-->
        <script src="analyst/pagescripts/an_mission1md.js"></script>
        <script src="js/mission-menu-builder.js"></script>
        <script>
            var msonJSOB = <%=request.getParameter("id")%>;
        </script>

        <!--Google Map-->
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
        <script type="text/javascript">
            var geocoder;
            var map;
            var marker;
            var infowindow = new google.maps.InfoWindow({size: new google.maps.Size(150, 50)});
            var address;
            var areaJSON;
            var savedArea;

        </script>

    </head>

    <body onload="initialize()">

        <!--Navigation Bar-->
        <script src="js/navigation.js"></script>

        <div id="container-fluid">
            <div id="content-shield" style="border-top: none;">
                <div class="col-md-2" style="position: fixed;">
                    <div style="background-color: rgba(230,230,230,1.0); color: black; width: 18vw; border-radius: 5px; text-align: justify; padding: 0 15px 0 15px;">
                        <h5 style="padding-top: 20px; font-size: 15px;"><span class="glyphicon glyphicon-file" aria-hidden="true"> </span><b> MISSION:</b><br> <label id="nav-mission-title-label" style="font-size: 13px; font-weight: 100; padding-left: 20px; text-align: left;"> </label></h5>
                        <h5 style="padding-bottom: 20px; font-size: 15px;"><span class="glyphicon glyphicon-user " aria-hidden="true"> </span><b> ANALYST:</b><br> <label id="nav-analyst-name-label" style="font-size: 13px; font-weight: 100; padding-left: 20px; text-align: left;"> </label></h5>
                    </div>
                    <ul class="nav nav-pills nav-stacked affix" id="nav-shield" role="tablist">
                    </ul>
                </div>
                <div class="col-md-10" style="margin-left: 18vw; height: 84vh; margin-top: 1vh;">
                    <div style="position: absolute; top: 80vh; right: 3vmin;">
                        <button type="button" onclick="saveMD()" class="btn btn-success btn-sm" style="position: fixed; right: 3vw;"><span class="glyphicon glyphicon-saved"></span> Save and Proceed to Data Sources</button>
                    </div>
                    <div id="mission-details">
                        <div class="col-md-9">
                            <table id="mission-details-table" style="width: 100%;">
                                <tr>
                                    <td>
                                        <h4><b>Details</b></h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Mission Title:  </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <input name="title"id="mission-title" type="text"  class="form-box" placeholder="Enter Mission Title" required>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Mission Area:  </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="input-group">
                                            <input type="text" id="address" class="form-control" placeholder="Search for an Area"required>
                                            <span class="input-group-btn">
                                                <button class="btn btn-default" type="button" value="Search Area" onclick="codeAddress()">
                                                    Locate Area
                                                </button>
                                            </span>
                                        </div><!-- /input-group -->
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="mission1md-area-map">

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Mission Objective:  </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <textarea name="objective" id="mission-objective" rows="4" cols="50" class="form-box" placeholder="Enter Mission Objective" style="height: 70px; margin-top: 5px;" required></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Situation:  </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <textarea name="situation" id="mission-situation" rows="4" cols="50" class="form-box" placeholder="Enter Situation" style="height: 70px; margin-top: 5px;" required ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4><b>Execution</b></h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>a. Commander's Intent </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <textarea name="commander-intent" id="commander-intent" rows="4" cols="50" class="form-box" placeholder="Enter Commander's Intent" style="height: 70px; margin-top: 5px;" required></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>b. Concept of Operations</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <textarea name="concept-of-operation" id="concept-of-operation" rows="4" cols="50" class="form-box" placeholder="Enter Concept of Operations" style="height: 70px; margin-top: 5px;" required></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Themes to Stress:  </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <textarea name="theme-stress" id="theme-stress" rows="4" cols="50" class="form-box" placeholder="Enter Themes to Stress" style="height: 70px; margin-top: 5px;" required></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Themes to Avoid:  </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <textarea name="theme-avoid" id="theme-avoid" rows="4" cols="50" class="form-box" placeholder="Enter Themes to Avoid" style="height: 70px; margin-top: 5px;" required></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td><h5>Task/s: <label class="btn btn-primary btn-sm" style="margin-left: 5px;" onclick="addTask('', '')"><span class="glyphicon glyphicon-plus"></span> Add Task</label></h5></td>
                                </tr>
                                <tr>
                                    <td colspan ="2">
                                        <table id="task-table">

                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--Notification Alert-->
        <div class="alert-messages text-center">
        </div>
    </body>
</html>
