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

        <!--Sliding Side Bar CSS-->
        <link href="css/BootSideMenu.css" rel="stylesheet">

        <!--Vis.js Plugin-->
        <script type="text/javascript" src="js/vis.js"></script>
        <link href="css/vis.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

        <!--Page Script-->
        <script src="analyst/pagescripts/an_mission4tcoa.js"></script>
        <script src="js/mission-menu-builder.js"></script>

        <script>
            $(function () {
                $('#collapseTwo').collapse('hide')
            });
            $(function () {
                $('#collapseOne').collapse('show')
            });
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
                        <button type="button" onclick="saveTCOA()" class="btn btn-success btn-sm" style="position: fixed; right: 3vw;"><span class="glyphicon glyphicon-saved"></span> Save and Proceed to CARVER Methodology</button>
                    </div>
                    <div id="mission-threat-courses-of-action" style="height: 79vh;">
                        <div id="tcoa-list" class="col-md-6">
                            <button class="btn btn-success" data-toggle="modal" data-target="#addTCOA" style="margin-bottom: 1vh;"><span class="glyphicon glyphicon-plus"></span> Add Threat Course of Action</button>  
                        </div>
                        <div class="col-md-6">
                            <div id="mission-characteristics-overlay-map"style="width: 36vw; border: solid 1px #D3D3D3">

                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add TCOA Modal -->
        <div class="modal fade" id="addTCOA" tabindex="-1" role="dialog" 
             aria-labelledby="addTCOAlabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" 
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            Add New Threat Course of Action
                        </h4>
                    </div>
                    <form action="AddThreatCoa" method="GET">                        
                        <div class="modal-body">
                            <h5>Course of Action: </h5>
                            <textarea name="add-tcoa" type="text" class="form-box" rows="4" cols="50" placeholder="Enter Course of Action"style="margin-top: 5px;"></textarea>

                        </div>
                        <div class="modal-footer">
                            <button name="save-tcoa" type="Submit" class="btn btn-success"><span class="glyphicon glyphicon-saved"> </span>
                                Add Threat Course of Action
                            </button>
                            <button name="close-tcoa" type="Submit" class="btn btn-default" 
                                    data-dismiss="modal">Close
                            </button>
                        </div>
                    </form>

                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!--Sliding Side Bar Menu-->
        <div id="slidingmenu" style="width: 40vw;">
            <div id="mission-center-of-gravity" style="height: 97vh; border: solid 1px #D3D3D3; margin: 1vh 1vw 1vh 1vw;">

            </div>
        </div>
        <!-- /Sliding Side Bar Menu-->

        <script src="js/BootSideMenu.js"></script>

        <script type="text/javascript">
        $('#slidingmenu').BootSideMenu({side: "right"});
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
