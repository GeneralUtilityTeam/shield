document.write(
        '\
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">\
            <div class="navbar-header">\
                <a class="navbar-brand active" href="ANHome">\
                        <span><img src="images/SHIELD LOGO.PNG" height="25px" width="22px"></span> SHIELD</a>\
            </div>\
            <div>\
                <ul class="nav navbar-nav" id="left-nav">\
                    <li><a href="ANMissions"><span class="glyphicon glyphicon-flag"></span> MISSIONS</a></li>\
                    <li><a href="ANSources"><span class="glyphicon glyphicon-folder-open"></span> DATA SOURCES</a></li>\
                </ul>\
                <!--Right Nav Bar-->\
                <ul class="nav navbar-nav navbar-right" id="right-nav">\
                    <li>\
                        <a href="Logout">\
                            <label id="global-username">_</label><span class="glyphicon glyphicon-user"></span> <label id="userlabel">Logout</label>\
                        </a>\
                    </li>\
                </ul>\
            </div>\
        </nav><br><br><br>\
        '
        );