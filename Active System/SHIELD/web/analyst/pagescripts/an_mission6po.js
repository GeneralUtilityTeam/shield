function initialize() {
    //replace first parameter with Mission Status - msonJSOB.status
    buildNav(6, 6);
}

function saveCM() {
    $.ajax({
        type: "GET",
        url: "Save6PO",
        success: function (response) {
            showAndDismissAlert("success", response);
            setTimeout(function () {
                window.location.assign("ANMissions")
            }, 3000);
        }
    });
}