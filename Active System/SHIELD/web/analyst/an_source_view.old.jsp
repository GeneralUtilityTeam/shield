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
        <script src="analyst/pagescripts/an_source_view.js"></script>
        <link href="css/bootstrap-tagsinput.css" rel="stylesheet" type="text/css">
        <script  src="js/bootstrap-tagsinput.min.js"></script>
    </head>
    <body onload="initialize()">

        <!--Navigation Bar-->
        <script src="js/navigation.js"></script>

        <div id="container-fluid">
            <div id="content-shield" style="border-top: none;">
                <div class="col-md-12">
                    <button type="submit" class="btn btn-success btn-sm" data-toggle="modal" data-target="#addExcerpt" style="margin-right: 5px;"><span class="glyphicon glyphicon-plus"></span> Add Excerpt to Source</button>
                    <a href="ANSources" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-arrow-left"></span> Back to List of Sources</a>

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

                    <table id="src-excerpts" class="excerpt-list" style="width: 100%;">

                    </table> 
                </div>
            </div>
        </div>       

        <!-- Add Excerpt Modal -->
        <div class="modal fade" id="addExcerpt" tabindex="-1" role="dialog" 
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
                                    <select class="form-box" required>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h5>Excerpt Text:  </h5>
                                </td>
                                <td>
                                    <textarea rows="4" cols="50" class="form-box" style="height: 70px;" required placeholder="Enter Excerpt Text"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h5>Tags:  </h5>
                                </td>
                                <td>
                                    <input type="text" data-role="tagsinput" class="form-box" required placeholder="Press Enter to Add Tag">
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" onclick="saveExcerpt()"><span class="glyphicon glyphicon-saved"> </span>
                            Add New Excerpt
                        </button>
                        <button type="button" class="btn btn-default" 
                                data-dismiss="modal">Close
                        </button>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div><!-- / Add Excerpt Modal-->

        <!-- View Excerpt Modal -->
        <div class="modal" id="viewExcerpt" tabindex="-1" role="dialog" 
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
                                <blockquote id="view-excerpt-text">20 words of the artifact only please it's so hard to reach 
                                    20 words please please please please please please</blockquote>
                                <h5>Category: <label id="category">Political</label></h5>
                                <h5>Source: <label id="source">Dan</label></h5>
                                <h5>Tags: <input id="enter-tags" type="text" data-role="tagsinput" class="form-box" disabled></h5>
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
        </div><!-- /View Artifact Modal-->

        <div class="alert-messages text-center">
        </div>
    </body>
</html>
