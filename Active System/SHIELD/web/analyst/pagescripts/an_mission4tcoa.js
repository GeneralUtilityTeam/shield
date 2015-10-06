function initialize() {
    //replace first parameter with Mission Status - msonJSOB.status
    buildNav(4, 4);
}

function saveTCOA() {
    $.ajax({
        type: "GET",
        url: "Save4TCOA",
        success: function (response) {
            showAndDismissAlert("success", response);
            setTimeout(function () {
                window.location.assign("ANMission5CM")
            }, 3000);
        }
    });
}