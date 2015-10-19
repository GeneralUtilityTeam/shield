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
        <script  src="js/alert.js"></script>

        <!--Sliding Side Bar CSS-->
        <link href="css/BootSideMenu.css" rel="stylesheet">

        <!--Page Script-->
        <script src="analyst/pagescripts/an_mission6po.js"></script>
        <script src="js/mission-menu-builder.js"></script>

        <!--Dropdown Checkbox-->
        <script type="text/javascript" src="js/bootstrap-multiselect.js"></script>
        <link rel="stylesheet" href="css/bootstrap-multiselect.css" type="text/css"/>

        <script>
            var missionStatus = <%=session.getAttribute("missionStatus")%>;
            var missionTitle = '<%=session.getAttribute("missionTitle")%>';
            var missionID = <%=session.getAttribute("missionID")%>;
            var analystName = '<%=session.getAttribute("analystName")%>';
        </script>

        <style>
            ::-webkit-scrollbar {
                width: 10px;
            }
            /* Track */
            ::-webkit-scrollbar-track {
                -webkit-border-radius: 5px;
                border-radius: 5px;
                background-color: #fff;
            }
            /* Handle */
            ::-webkit-scrollbar-thumb {
                -webkit-border-radius: 5px;
                border-radius: 5px;
                background: #F5F5F5;
            }
            .alignRight {
                text-align: right;
            }
            .alignCenter {
                text-align: center;
            }
            .bold {
                font-weight: 800;
            }
        </style>

    </head>

    <body>

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
                <div class="col-md-10" style="margin-left: 19vw; width: 76vw; overflow: auto; margin-top: 1vh;">
                    <div style="position: absolute; top: 80vh; right: 3vmin;">
                        <button type="button" onclick="savePO()" class="btn btn-success btn-sm" style="position: fixed; right: 3vw;"><span class="glyphicon glyphicon-saved"></span> Save and Proceed to PsyOps Objective</button>
                    </div><br>
                    <div style="height: 75vh;padding-top: 1vh; padding-right: 0;">
                        <div class="panel-group" id="accordion">

                        </div>

                        <div id="psyopsObj" style="width: 70%; margin-left: 15%;">
                            
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
