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
        
        <!--Data Table-->
        <link rel="stylesheet" href="https://cdn.datatables.net/1.10.9/css/dataTables.bootstrap.min.css">
        <script src="https://cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>
        <script src="https://cdn.datatables.net/1.10.9/js/dataTables.bootstrap.min.js"></script>
        

        <!--Page Script-->
        <script src="admin/pagescripts/ad_home.js"></script>

    </head>
    <body onload="initialize()">

        <!--Navigation Bar-->
        <script src="js/ad_navigation.js"></script>

        <div id="container-fluid">

            <ul id="myTab" class="nav nav-tabs" style="margin-left: 1.5vw; margin-right: 1.5vw">
                <li class="active"><a href="#shield-users" data-toggle="tab">SHIELD Users</a></li>
                <li><a href="#access-log" data-toggle="tab">Access Log</a></li>
                <li><a href="#action-log" data-toggle="tab">Action Log</a></li>
            </ul>
            <div id="content-shield" style="border-top: none; height: 82vh;">
                <div id="myTabContent" class="tab-content">

                    <div class="tab-pane fade in active" id="shield-users">

                        <button type="submit" class="btn btn-success btn-sm" data-toggle="modal" data-target="#addUser" style="margin-right: 1vw;"><span class="glyphicon glyphicon-plus"></span> Add New User</button>

                        <table id="user-table" class="table table-bordered table-hover list-table">
                            <thead style="background-color: #D3D3D3;">
                                <tr>
                                    <th width="20%">Username</th>
                                    <th width="30%">Name</th>
                                    <th width="20%">Account Type</th>
                                    <th width="15%">Status</th>
                                    <th width="15%">Last Login</th>
                                </tr>
                            </thead>
                            <tbody id="user-table-body">

                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane fade" id="access-log">
                        <table id="access-table" class="table table-bordered table-hover list-table">
                            <thead style="background-color: #D3D3D3;">
                                <tr>
                                    <th width="30%">Username</th>
                                    <th width="30%">Access Type</th>
                                    <th width="40%">Date</th>
                                </tr>
                            </thead>
                            <tbody id="access-log-body">

                            </tbody>
                        </table>
                    </div>

                    <div class="tab-pane fade" id="action-log">
                        <table id="action-table" class="table table-bordered table-hover list-table">
                            <thead style="background-color: #D3D3D3;">
                                <tr>
                                    <th width="30%">Username</th>
                                    <th width="30%">Action</th>
                                    <th width="40%">Date and Time</th>
                                </tr>
                            </thead>
                            <tbody id="action-log-body">

                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </div>

        <!-- Add User Modal -->
        <div class="modal fade" id="addUser" tabindex="-1" role="dialog" 
             aria-labelledby="addUserlabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" 
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            Add User
                        </h4>
                    </div>
                    <div class="modal-body">
                        <table id="begin-mission-table" style="width: 100%;">
                            <tr>
                                <td>
                                    User Type: <select class="form-box" placeholder="Enter Username"required>
                                        <option value="2">Analyst</option>
                                        <option value="3">Encoder</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Username: <input type="text" name="add-username" class="form-box" placeholder="Enter Username"required>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Password: <input type="password" name="add-password" class="form-box" placeholder="Enter Password"required>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Name Title: <input type="text" name="add-name-title" class="form-box" placeholder="Enter Name Title (e.g. Mr, Captain, Major)" required>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    First Name: <input type="text" name="add-name-first" class="form-box" placeholder="Enter First Name" required>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Other Name: <input type="text" name="add-name-other" class="form-box" placeholder="Enter Other Name (Middle Initial/Middle Name)">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Last Name: <input type="text" name="add-name-last" class="form-box" placeholder="Enter Last Name" required>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" onclick="addUser()" class="btn btn-success"><span class="glyphicon glyphicon-saved"> </span>
                            Add User
                        </button>
                        <button type="button" class="btn btn-default" 
                                data-dismiss="modal">Close
                        </button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!-- Edit User Modal -->
        <div class="modal fade" id="updateUser" tabindex="-1" role="dialog" 
             aria-labelledby="updateUserlabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" 
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            Update User
                        </h4>
                    </div>
                    <div class="modal-body">
                        <table id="begin-mission-table" style="width: 100%;">
                            <tr>
                                <td>
                                    Username: <input type="text" name="edit-username" class="form-box" placeholder="Enter Username"required>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Old Password: <input type="password" name="edit-old-password" class="form-box" placeholder="Enter Old Password"required>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    New Password: <input type="password" name="edit-new-password" class="form-box" placeholder="Enter New Password"required>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Name Title: <input type="text" name="edit-name-title" class="form-box" placeholder="Enter Name Title (e.g. Mr, Captain, Major)" required>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    First Name: <input type="text" name="edit-name-first" class="form-box" placeholder="Enter First Name" required>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Other Name: <input type="text" name="edit-name-other" class="form-box" placeholder="Enter Other Name (Middle Initial/Middle Name)">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Last Name: <input type="text" name="edit-name-last" class="form-box" placeholder="Enter Last Name" required>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" onclick="updateUser()" class="btn btn-success"><span class="glyphicon glyphicon-saved"> </span>
                            Update User
                        </button>
                        <button type="button"  data-toggle="modal" data-target="#clearModal" class="btn btn-danger"><span class="glyphicon glyphicon-trash"> </span>
                            Delete User
                        </button>
                        <button type="button" class="btn btn-default" 
                                data-dismiss="modal">Close
                        </button>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!-- Modal -->
        <div class="modal fade" id="clearModal" tabindex="-1" role="dialog" 
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" 
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            Delete User
                        </h4>
                    </div>
                    <div class="modal-body">
                        Would you like to delete this User?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="deleteUser()" data-dismiss="modal">
                            Confirm
                        </button>
                        <button type="button" class="btn btn-default" 
                                data-dismiss="modal">Cancel
                        </button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="alert-messages text-center">
        </div>
    </body>
</html>
