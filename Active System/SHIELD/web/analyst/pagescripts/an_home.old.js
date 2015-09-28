function initialize() {
    showAndDismissAlert('success', 'Welcome to <strong>SHIELD! </strong>');
}

function beginMission() {
    $.ajax({
        type: "GET",
        url: "BeginNewMission",
        success: function (response) {
            showAndDismissAlert("success", response);
            setTimeout(function(){ window.location.assign("ANMission1MD") }, 3000);
        }
    });
}
