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

        <!--Bootstrap Tags-input-->
        <link rel="stylesheet" href="css/bootstrap-tagsinput.css">
        <script src="js/bootstrap-tagsinput.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
        <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.0/css/bootstrap-toggle.min.css" rel="stylesheet">
        <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.0/js/bootstrap-toggle.min.js"></script>

        <!--Page Script-->
        <script src="analyst/pagescripts/an_mission2pco.js"></script>
        <script src="js/mission-menu-builder.js"></script>

        <!--Map Script-->
        <script src="https://maps.googleapis.com/maps/api/js?sensor=false&libraries=drawing,geometry,places&ext=.js"></script>
        <script src="http://jawj.github.io/OverlappingMarkerSpiderfier/bin/oms.min.js"></script>

        <script>
            var msonStatus = <%=request.getAttribute("msonStatus")%>;
            var missionTitle = '<%=session.getAttribute("missionTitle")%>';
            var analystName = '<%=session.getAttribute("analystName")%>';
            var missionID = <%=request.getAttribute("msonID")%>;
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
                        <button type="button" onclick="savePCO()" class="btn btn-success btn-sm" style="position: fixed; right: 3vw;"><span class="glyphicon glyphicon-saved"></span>Save and Proceed to Characterstics Overlay</button>
                    </div>

                    <div id="data-sources">
                        <div class="col-md-6">
                            <div class="inner-addon right-addon" style=" z-index: 1; position: fixed; height: 7vh; width: 28vw; margin: 1vh 0 0 1vmin; box-shadow: 5px 5px 5px #aaaaaa;">
                                <i class="glyphicon glyphicon-search"></i>
                                <input type="text" id="search-field" class="form-control" autocomplete="off" spellcheck="false" placeholder="Search for Excerpts" required/>
                            </div>
                            <div class="btn-group" style="z-index: 1; position: fixed; margin: 72vh 0 0 1vmin;">
                                <a class="btn btn-default" onclick="createEntity()"><i class="fa fa-plus" style="color:#009900"></i> Create Entity</a>
                                <a class="btn btn-default" onclick="deleteEntity()" data-toggle="tooltip" title="Right-click on Entity to delete from this Mission" data-placement="bottom"><i class="fa fa-trash" style="color:#CC0000"></i> Delete Entity</a>
                                <a class="btn btn-default" onclick="clearSelection()"><i class="fa fa-refresh" style="color:#2b2b2b"></i> Clear Selection</a>
                            </div>
                            <div id="mission2pco-area-map" style="height: 78vh; width: 74vw; border-style: solid; border-width: 1px; border-color: #D3D3D3; border-radius: 3px;">
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </div>

        <!-- Entity Modal -->
        <div class="modal" id="entityModal" tabindex="-1" role="dialog" 
             aria-labelledby="entityModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" >
                    <div class="modal-header">
                        <button type="button" class="close" 
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="entityModalLabel">
                            Entity
                        </h4>
                    </div>
                    <div class="modal-body scroll" id="view-modal-body" style="overflow: auto; padding-left: 10%; padding-right: 10%;">
                        <label style="width: 20%;">Entity Name: </label> <input type="text" id="entity-name" class="form-box" style="width: 76%"><br><br>

                        <label style="display: block; text-align: center">Set minimum Entity strength to: </label>
                        <input type="range" id="rangeInput" name="rangeInput" step="1" min="1" max="5" style="width: 50%; margin: 0 24% 0 24%;">
                        <label id="rangeText" style="display: block; text-align: center; font-weight: 100;"/></label><hr>

                    <table id="table5" class="enable">
                            <tr>
                                <th style="padding: 0 22% 10px 22%;" colspan="2"><input id="enable5" type="checkbox" data-toggle="toggle" data-on="Check All Very Strong Relevance Excerpts" data-off="Select Very Strong Relevance Excerpts" data-onstyle="success" data-offstyle="default" data-width="260" data-size="small"> </th>
                            </tr>
                        </table><hr>
                        <table id="table4" class="enable">
                            <tr>
                                <th style="padding: 0 22% 10px 22%;" colspan="2"><input id="enable4" type="checkbox" data-toggle="toggle" data-on="Check All Strong Relevance Excerpts" data-off="Select Strong Relevance Excerpts" data-onstyle="info" data-offstyle="default" data-width="260" data-size="small"> </th>
                            </tr>
                        </table><hr>
                        <table id="table3" class="enable">
                            <tr>
                                <th style="padding: 0 22% 10px 22%;" colspan="2"><input id="enable3" type="checkbox" data-toggle="toggle" data-on="Check All Moderate Relevance Excerpts" data-off="Select Moderate Relevance Excerpts" data-onstyle="warning" data-offstyle="default" data-width="260" data-size="small"> </th>
                            </tr>
                        </table><hr>
                        <table id="table2" class="enable">
                            <tr>
                                <th style="padding: 0 22% 10px 22%;" colspan="2"><input id="enable2" type="checkbox" data-toggle="toggle" data-on="Check All Weak Relevance Excerpts" data-off="Select Weak Relevance Excerpts" data-onstyle="danger" data-offstyle="default" data-width="260" data-size="small"> </th>
                            </tr>
                        </table><hr>
                        <table id="table1" class="enable">
                            <tr>
                                <th style="padding: 0 22% 10px 22%;" colspan="2"><input id="enable1" type="checkbox" data-toggle="toggle" data-on="Check All Very Weak Relevance Excerpts" data-off="Select Very Weak Relevance Excerpts" data-onstyle="default" data-offstyle="default" data-width="260" data-size="small"> </th>
                            </tr>
                        </table>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" onclick="saveEntity()">
                            <span class="glyphicon glyphicon-saved"> </span> Create Entity
                        </button>
                        <button type="button" class="btn btn-default" 
                                data-dismiss="modal">Close
                        </button>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!--Sliding Side Bar Menu-->
        <div id="slidingmenu" style="width: 22vw;">
            <div style="border: solid 1px #D3D3D3; border-radius: 5px; padding-left: 1vw; margin: 10px 10px 10px 10px; background-color: rgba(250,250,250,1);">
                <h4 style="font-size: 1.2vw; font-weight: 600; ">Summary of Data Sources</h4>
                <h6>Political: <label id="political"></label></h6>
                <h6>Military/Security: <label id="military-security"></label></h6>
                <h6>Economic: <label id="economic"></label></h6>
                <h6>Social: <label id="social"></label></h6>
                <h6>Information: <label id="information"></label></h6>
                <h6>Infrastructure and Technology: <label id="infrastructure-technology"></label></h6>
                <h6>Environment/Physical: <label id="environment-physical"></label></h6>
            </div>
            <h4 style="margin-top: 2vh; margin-bottom: 1vh; text-align: center;">Mission Entities</h4>
            <div id="mission-entities">

            </div>

        </div>

        <!--/Sliding Side Bar Menu-->

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

        <!--Notification Alert-->
        <div class="alert-messages text-center">
        </div>
    </body>
</html>
