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
            var msonStatus = <%=request.getAttribute("msonStatus")%>;
            var missionID = <%=request.getAttribute("msonID")%>;

            var missionLabels = '<%=request.getAttribute("labels")%>';
            $(function () {
                $('#collapseTwo').collapse('hide')
            });
            $(function () {
                $('#collapseOne').collapse('show')
            });
        </script>

        <!--Vis.js Style-->
        <style type="text/css">
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
                        <button type="button" onclick="saveCOG()" class="btn btn-success btn-sm" style="position: fixed; right: 3vw;"><span class="glyphicon glyphicon-saved"></span> Save and Proceed to Threat Course of Action</button>
                    </div>
                    <div id="network-popUp">
                        <span id="operation">node</span> <br>
                        <table style="margin:auto;"><tr>
                                <td>id</td><td><input id="node-id" value="new value" /></td>
                            </tr>
                            <tr>
                                <td>label</td><td><input id="node-label" value="new value" /></td>
                            </tr>
                            <tr>
                                <td>group</td><td>
                                    <select id="node-group">
                                        <option value="cog">Center of Gravity</option>
                                        <option value="cc">Critical Capability</option>
                                        <option value="cr">Critical Requirement</option>
                                        <option value="cv">Critical Vulnerability</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                        <input type="button" value="save" id="saveButton"/>
                        <input type="button" value="cancel" id="cancelButton" />
                    </div>
                    <br />
                    <div id="mynetwork"></div>
                    <div class="btn-group" style="position: fixed; top:85vh; margin-left: 1%;">
                        <a class="btn btn-sm btn-default" data-toggle="modal" data-target="#doesusesModal"><i class="fa fa-navicon" style="color:#202020"></i> Does/Uses Menu</a>

                    </div>
                </div>
            </div>
        </div>

        <!-- Does/Uses Modal -->
        <div class="modal fade" id="doesusesModal" tabindex="-1" role="dialog" 
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" 
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            Center of Gravity Analysis - Does/Uses
                        </h4>
                    </div>
                    <div class="modal-body" style="overflow: auto; padding-left: 10%; padding-right: 10%;">

                        <table id="does-uses-table" width="100%">
                            <tr>
                                <th width="40%">Entity</th>
                                <th widhth="30%" style="text-align: center;">Does</th>
                                <th width="30%" style="text-align: center;">Uses</th>
                            </tr>

                        </table>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" onclick="setEntityType()">
                            <span class="glyphicon glyphicon-arrow-right"></span>
                            Next Step
                        </button>
                        <button type="button" class="btn btn-default" 
                                data-dismiss="modal">Cancel
                        </button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->


        <!-- Critical Vulnerability Modal -->
        <div class="modal fade" id="cvModal" tabindex="-1" role="dialog" 
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" 
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            Center of Gravity Analysis - Critical Vulnerability
                        </h4>
                    </div>
                    <div class="modal-body scroll">
                        <table id="cv-table" width="100%">
                            <tr>
                                <th width="50%">Entity</th>
                                <th widhth="50%" style="text-align: center;">Vulnerable to Neutralize/Attack?</th>
                            </tr>

                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" onclick="setCV()">
                            <span class="glyphicon glyphicon-saved"></span> Confirm
                        </button>
                        <button type="button" class="btn btn-default" 
                                data-dismiss="modal">Cancel
                        </button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <!--Sliding Side Bar Menu-->
        <div id="slidingmenu" style="width: 22vw;">
            <h4 style="margin-top: 2vh; margin-bottom: 1vh; text-align: center;">Mission Entities</h4>
            <div id="mission-entity">
                <table id="entity-table" style="padding: 10px; margin-left: 10px;">

                </table>
            </div>

        </div>
        <script src="js/BootSideMenu.js"></script>

        <script type="text/javascript">
                            $('#slidingmenu').BootSideMenu({side: "left", autoClose: false});
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
