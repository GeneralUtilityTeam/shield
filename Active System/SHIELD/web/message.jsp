<%-- 
    Document   : message.jsp
    Created on : Jul 30, 2014, 9:56:57 AM
    Author     : Franco
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <script>
            function initialize() {
                var destination = '<%=request.getAttribute("destination")%>'
                window.location.href = (destination);
            }
        </script>
    </head>
    <body>
        <script>
            onload = initialize();
        </script>
    </body>
</html>
