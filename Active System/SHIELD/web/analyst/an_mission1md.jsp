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
        <link href="css/bootstrap-tagsinput.css" rel="stylesheet" type="text/css">
        <script  src="js/bootstrap-tagsinput.js"></script>


        <script type="text/javascript">
            var msonJSOB = <%=request.getAttribute("msonJSOB")%>;
            var missionID = <%=session.getAttribute("missionID")%>;
            var missionTitle = '<%=session.getAttribute("missionTitle")%>';
            var missionStatus = <%=session.getAttribute("missionStatus")%>;
            var analystName = '<%=session.getAttribute("analystName")%>';
            var userFullName = '<%=session.getAttribute("userFullName")%>';
            var geocoder;
            var address;
            var areaJSON;
            var savedArea;

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
                        <button type="button" onclick="saveMD()" class="btn btn-success btn-sm" style="position: fixed; right: 3vw;"><span class="glyphicon glyphicon-saved"></span> Save and Proceed to Characteristics Overlay</button>
                    </div>
                    <div id="mission-details">
                        <div class="col-md-9">
                            <table id="mission-details-table" style="width: 95%;">
                                <tr>
                                    <td>
                                        <h4><b>Details</b></h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5><b>Mission Title:  </b></h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input name="title"id="title" type="text"  class="form-box" placeholder="Enter Mission Title" required>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5><b>Mission Area:  </b></h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" id="address" class="form-box" placeholder="Mission Area" required disabled>

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5><b>Mission Threat:  </b></h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" id="threat" class="form-box" placeholder="Enter Mission Threat" required>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5><b>Mission Objective:  </b></h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <textarea name="objective" id="objective" rows="4" cols="50" class="form-box" placeholder="Enter Mission Objective" style="height: 70px; margin-top: 5px;" required></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label data-toggle="tooltip" title="Press Enter to Add Keyword" style="width: 9%; font-weight: 100; font-size: 12px;">Keywords: </label> <input style="width: 40vw;" id="objective-keyword" type="text" data-role="tagsinput" class="form-box" >
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <h5><b>Situation:  </b></h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <textarea id="situation" rows="4" cols="50" class="form-box" placeholder="Enter Mission Situation" style="height: 70px; margin-top: 5px;" required></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label data-toggle="tooltip" title="Press Enter to Add Keyword" style="width: 9%; font-weight: 100; font-size: 12px;">Keywords: </label> <input style="width: 40vw;" id="situation-keyword" type="text" data-role="tagsinput" class="form-box" >
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5><b>Execution:  </b></h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <textarea id="execution" rows="4" cols="50" class="form-box" placeholder="Enter Mission Execution" style="height: 70px; margin-top: 5px;" required></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label data-toggle="tooltip" title="Press Enter to Add Keyword" style="width: 9%; font-weight: 100; font-size: 12px;">Keywords: </label> <input style="width: 40vw;" id="execution-keyword" type="text" data-role="tagsinput" class="form-box" >
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5><b>Admin and Logistics:  </b></h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <textarea id="admin-logistics" rows="4" cols="50" class="form-box" placeholder="Enter Mission Admin and Logistics" style="height: 70px; margin-top: 5px;" required></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label data-toggle="tooltip" title="Press Enter to Add Keyword" style="width: 9%; font-weight: 100; font-size: 12px;">Keywords: </label> <input style="width: 40vw;" id="admin-logistics-keyword" type="text" data-role="tagsinput" class="form-box" >
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5><b>Command and Signal:  </b></h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <textarea name="objective" id="command-signal" rows="4" cols="50" class="form-box" placeholder="Enter Mission Command and Signal" style="height: 70px; margin-top: 5px;" required></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label data-toggle="tooltip" title="Press Enter to Add Keyword" style="width: 9%; font-weight: 100; font-size: 12px;">Keywords: </label> <input style="width: 40vw;" id="command-signal-keyword" type="text" data-role="tagsinput" class="form-box" >
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Reset Modal -->
        <div class="modal fade" id="resetModal" tabindex="-1" role="dialog" 
             aria-labelledby="resetModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" >
                    <div class="modal-header">
                        <button type="button" class="close" 
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="entityModalLabel">
                            Reset Mission Status
                        </h4>
                    </div>
                    <div class="modal-body" id="view-modal-body" style="overflow: auto; padding-left: 10%; padding-right: 10%;">
                        <label>Making changes in this phase will require that your mission data be reset on this current phase. Would you like to proceed? </label> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning"
                                data-dismiss="modal" onclick="confirmSave()">Confirm
                        </button>
                        <button type="button" class="btn btn-default"
                                data-dismiss="modal">Close
                        </button>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!--Notification Alert-->
        <div class="alert-messages text-center">
        </div>
    </body>
</html>
