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
        <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.0/css/bootstrap-toggle.min.css" rel="stylesheet">
        <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.0/js/bootstrap-toggle.min.js"></script>

        <!--Layout-->
        <link href="css/layout.css" rel="stylesheet" type="text/css">
        <link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>

        <!--General Scripts-->
        <script src="js/util.js"></script>
        <script  src="js/alert.js"></script>

        <!--Sliding Side Bar CSS-->
        <link href="css/BootSideMenu.css" rel="stylesheet">

        <!--Vis.js Plugin-->
        <script type="text/javascript" src="js/vis.js"></script>
        <link href="css/vis.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

        <!--Page Script-->
        <script src="analyst/pagescripts/an_mission3cog.js"></script>
        <script src="js/mission-menu-builder.js"></script>

        <script>
            var missionStatus = <%=session.getAttribute("missionStatus")%>;
            var missionTitle = '<%=session.getAttribute("missionTitle")%>';
            var missionID = <%=session.getAttribute("missionID")%>;
            var analystName = '<%=session.getAttribute("analystName")%>';
            var userFullName = '<%=session.getAttribute("userFullName")%>';

            var nodesArray = <%=request.getAttribute("nodesJSON")%>;
            var edgesArray = <%=request.getAttribute("edgesJSON")%>;
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

            #mynetwork {
                position: absolute;
                top: 1vh;
                margin-left: 1vw;
                width: 74vw;
                height: 77vh;
                border: 1px solid #cccccc;
            }

            #operation {
                font-size:28px;
            }
            #network-popUp {
                display:none;
                position:absolute;
                top:150px;
                left:170px;
                z-index:299;
                width:250px;
                height:150px;
                background-color: #f9f9f9;
                border-style:solid;
                border-width:3px;
                border-color: #5394ed;
                padding:10px;
                text-align: center;
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
                <div class="col-md-10" style="margin-left: 18vw; height: 84vh; margin-top: 1vh;">
                    <div style="position: absolute; top: 80vh; right: 3vmin;">
                        <button type="button" onclick="saveCOG()" class="btn btn-success btn-sm" style="position: fixed; right: 3vw;"><span class="glyphicon glyphicon-saved"></span> Save and Proceed to Threat Course of Action</button>
                    </div>

                    <br />
                    <div id="mynetwork"></div>
                    <!--                    <div class="btn-group" style="position: fixed; top:85vh; margin-left: 1%;">
                                            <a class="btn btn-sm btn-default" data-toggle="modal" data-target="#doesusesModal"><i class="fa fa-navicon" style="color:#202020"></i> Does/Uses Menu</a>
                    
                                        </div>-->

                    <div class="btn-group" style="position: fixed; top:84%; margin-left: 1%;">
                        <a class="btn btn-default"><i class="fa fa-dot-circle-o" style="color:#CC0000"></i> Center of Gravity</a>
                        <a class="btn btn-default"><i class="fa fa-bomb" style="color:#202020"></i> Critical Capability</a>
                        <a class="btn btn-default"><i class="fa fa-exclamation-circle" style="color:#FF4500"></i> Critical Requirement</a>
                        <a class="btn btn-default"><i class="fa fa-unlock-alt" style="color:#DAA520"></i> Critical Vulnerability</a>
                    </div>
                </div>
            </div>
        </div>

        <!--Sliding Side Bar Menu-->
        <div id="slidingmenu" style="width: 22vw;">
            <h5 style="text-align: center;"><b>Mission Entities</b></h5>
            <div class="panel-group" id="accordion" style="margin: 10px 10px 10px 10px; ">

            </div>

        </div>
        <script src="js/BootSideMenu.js"></script>

        <script type="text/javascript">
                            $('#slidingmenu').BootSideMenu({side: "left", autoClose: true});
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
