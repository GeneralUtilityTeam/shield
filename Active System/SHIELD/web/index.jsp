<!DOCTYPE html>
<html>
    <head>
        <title>SHIELD: Decision Support System</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

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
        <script type="text/javascript">
            var message = '<%=session.getAttribute("message")%>';
            <%
            session.removeAttribute("message");
            %>
            function initialize(){
                if(message != 'null')
                    showAndDismissAlert('warning', 'Incorrect Login Details')
            }
            
            </script>

    </head>
    <body style="background-image: url('images/CMOG_BG.jpg'); background-size: cover; background-repeat: no-repeat;" onload="initialize()">
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="navbar-header">
                <a class="navbar-brand active" href="#"><span><img src="images/SHIELD LOGO.PNG" height="25px" width="22px"></span> SHIELD</a>
            </div>
            <div>
                <!--Right Nav Bar-->
                <form action="Login" method="POST" class="navbar-form navbar-right" role="search" style="margin-right: 15px;">
                    <div class="form-group">
                        <input type="text" class="form-control" name="uname" placeholder="Enter Username" required>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" name="pword" placeholder="Enter Password" required>
                    </div>
                    <button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-log-in"></span> Login</button>
                </form>
                </form>
            </div>
        </nav><br><br><br>

        <div class="alert-messages text-center">
        </div>
    </body>
</html>
