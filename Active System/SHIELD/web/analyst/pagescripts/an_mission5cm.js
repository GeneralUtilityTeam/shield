function initialize() {
    //replace first parameter with Mission Status - msonJSOB.status
    buildNav(5, 5);
}

function saveCM() {
    $.ajax({
        type: "GET",
        url: "Save5CM",
        success: function (response) {
            showAndDismissAlert("success", response);
            setTimeout(function () {
                window.location.assign("ANMission6PO")
            }, 3000);
        }
    });
}