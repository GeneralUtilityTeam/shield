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

        <!--Page Script-->
        <script src="analyst/pagescripts/an_missions.js"></script>

    </head>
    <body onload="initialize()">

        <!--Navigation Bar-->
        <script src="js/navigation.js"></script>

        <div id="container-fluid">
            <div id="content-shield" style="border-top: none;">
                <h4 style="font-weight: 700; text-align: center;">ALL MISSIONS</h4>
                <table id="mission-table" class="table table-bordered table-hover list-table" width="100%">
                            <thead style="background-color: #D3D3D3;">
                                <tr>
                                    <th width="30%">Mission Title</th>
                                    <th width="50%">Area of Operation</th>
                                    <th width="20%">Progress</th>
                                </tr>
                            </thead>
                            <tbody id="mission-table-body">
                               
                                </tbody>
                        </table>
            </div>
        </div>
        
        <!--Notification Alert-->
        <div class="alert-messages text-center">
        </div>
    </body>
</html>
