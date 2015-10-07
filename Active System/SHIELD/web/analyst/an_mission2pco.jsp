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

        <!--Page Script-->
        <script src="analyst/pagescripts/an_mission2pco.js"></script>
        <script src="js/mission-menu-builder.js"></script>

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
                            <table>
                                <tbody>
                                    <tr>
                                        <td width="10%"><h4>Search: </h4></td>
                                        <td width="90%"><input type="text" id="search-field" class="form-box tt-query" autocomplete="off" spellcheck="false" placeholder="Search from All Data Sources" required></td>

                                    </tr>
                                </tbody>
                            </table>
                            <hr>
                            <table class="table table-hover table-bordered list-table" cellspacing="0" width="100%" id="result-table">
                                
                            </table> 
                        </div>
                        <div class="col-md-6" id="mission2pco-area-map">
                        </div>
                    </div>    
                </div>
            </div>
        </div>

        <!-- View Excerpt Modal -->
        <div class="modal" id="viewExcerpt" tabindex="-1" role="dialog" 
             aria-labelledby="viewExcerptlabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" >
                    <div class="modal-header">
                        <button type="button" class="close" 
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            View Excerpt
                        </h4>
                    </div>
                    <div class="modal-body scroll" id="view-modal-body" style="height: 70vh; overflow: auto;">

                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    Excerpt <label id='viewID'></label>
                                </h4>
                            </div>
                            <div class="panel-body">
                                <blockquote id='viewText'></blockquote>
                                <h5>Category: <label id="viewCategory"></label></h5>
                                <h5>Area: <label id="viewArea"></label></h5>
                                <h5>Source: <label id="viewSource"></label></h5>
                                <h5>Tags: <input id="viewTags" class="form-box" data-role="tagsinput" width="100%" disabled/></h5>
                            </div>

                            <button type="button" id="viewSecondaryExcerpt" class="btn btn-default btn-block" data-toggle="collapse" 
                                    data-target="#related-excerpts"><span class="glyphicon glyphicon-menu-down" id="secondaryExcerptMenu"></span>
                                See Related Excerpts
                            </button>
                            <div id="related-excerpts" class="collapse">
                                <table class="table table-hover table-bordered list-table" cellspacing="0" width="100%" id="related-table">
                                   
                                </table> 
                            </div>
                        </div>
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
        <div id="slidingmenu" style="width: 18vw;">
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
            <h4 style="margin-top: 2vh; margin-bottom: 1vh; text-align: center;">Mission Sources</h4>
            <div id="mission-sources">
                <table class="excerpt-list" style="width: 18vw;" id="source-table">
                </table>
            </div>

        </div>

        <!--/Sliding Side Bar Menu-->

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

        <!--Notification Alert-->
        <div class="alert-messages text-center">
        </div>
    </body>
</html>
