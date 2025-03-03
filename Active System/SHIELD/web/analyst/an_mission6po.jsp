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

        <!--Map Script-->
        <script src="https://maps.googleapis.com/maps/api/js?sensor=false&libraries=drawing,geometry,places&ext=.js"></script>

        <script>
            var missionStatus = <%=session.getAttribute("missionStatus")%>;
            var missionTitle = '<%=session.getAttribute("missionTitle")%>';
            var missionID = <%=session.getAttribute("missionID")%>;
            var analystName = '<%=session.getAttribute("analystName")%>';
            var userFullName = '<%=session.getAttribute("userFullName")%>';
            var login = '<%=session.getAttribute("login")%>';
            $(window).load(function () {
                $('#tipModal').modal('show');
            });
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
                        <button type="button" onclick="savePO()" class="btn btn-success btn-sm" style="position: fixed; right: 3vw;"><span class="glyphicon glyphicon-saved"></span> PsyOps Plan Completed</button>
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
        
        <!-- Tip Modal -->
        <div class="modal fade in" id="tipModal" tabindex="-1" role="dialog" 
             aria-labelledby="tipModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" >
                    <div class="modal-header">
                        <button type="button" class="close" 
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="entityModalLabel">
                            Tip! 
                        </h4>
                    </div>
                    <div class="modal-body" id="view-modal-body" style="overflow: auto; padding-left: 10%; padding-right: 10%;">
                        <label style="font-weight:500;"> - <strong>Each PsyOps Objective</strong> requires at least <strong>two (2) Supporting POs</strong> (Supporting PsyOps Objective)</label> 
                        <label style="font-weight:500;"> - A <strong>red box</strong> signifies that the value is <strong>low</strong> and is <strong>not recommended</strong> to be used as reference.</label> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default"
                                data-dismiss="modal">Close
                        </button>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!--Sliding Side Bar Menu-->
        <div id="slidingmenu" style="width: 22vw;">
            <h5 style="text-align: center;"><b>Center of Gravity</b></h5>
            <div class="panel-group" id="cog-sidebar" style="margin: 10px 10px 10px 10px; ">

            </div>
            <h5 style="text-align: center;"><b>Threat Course of Action</b></h5>
            <div class="panel-group" id="accordion-sidebar" style="margin: 10px 10px 10px 10px; ">

            </div>
        </div>

        <script src="js/BootSideMenu.js"></script>

        <script type="text/javascript">
            $('#slidingmenu').BootSideMenu({side: "left"});
        </script>
        <script type="text/javascript">

            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-36251023-1']);
            _gaq.push(['_setDomainName', 'jqueryscript.net']);
            _gaq.push(['_trackPageview']);

            (function () {
                var ga = document.createElement('script');
                ga.type = 'text/javascript';
                ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ga, s);
            })();

        </script>
        <!--/Sliding Side Bar Menu-->

        <!--Notification Alert-->
        <div class="alert-messages text-center">
        </div>
    </body>
</html>
