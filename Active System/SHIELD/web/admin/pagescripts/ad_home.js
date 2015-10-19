function initialize() {
    showAndDismissAlert("success", "Welcome to <strong>SHIELD </strong>- Admin")
    
    //Data Tables
    excrTable = $('#src-excerpts').DataTable({
        "ajax": {
            "url": "GetAllUser",
            "dataSrc": ""
        },
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "columns": [
            {"data": "id"},
            {"data": "categoryDesc"},
            {"data": "text"}
        ]
    });
    $('#src-excerpts tbody').on('click', 'tr', function () {
        var data = excrTable.row(this).data();
        viewExcerpt(data.id);
    });
}
function addUser() {
    
}
function updateUser() {
    
}
function deleteUser() {
    
}