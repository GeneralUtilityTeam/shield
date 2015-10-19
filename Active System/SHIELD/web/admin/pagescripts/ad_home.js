var userTable;
var accessTable;
var actionTable;
function initialize() {
    showAndDismissAlert("success", "Welcome to <strong>SHIELD </strong>- Admin")
    
    //Data Tables
    userTable = $('#user-table').DataTable({
        "ajax": {
            "url": "GetAllUser",
            "dataSrc": ""
        },
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "columns": [
            {"data": "uname"},
            {"data": "fullName"},
            {"data": "classDesc"},
            {"data": "status"},
            {"data": "lastSeen"}
        ],
        "columnDefs" : [
            {
                "render": function ( data, type, row ) {
                    if (data == null)
                        return "";
                    else
                        return data;
                },
                "targets": 4
            }
        ],
    });
    $('#user-table tbody').on('click', 'tr', function () {
        var data = userTable.row(this).data();
        console.log(data);
    });
    
    accessTable = $('#access-table').DataTable({
        "ajax": {
            "url": "GetAccessLog",
            "dataSrc": ""
        },
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "columns": [
            {"data": "userUname"},
            {"data": "entryClassDesc"},
            {"data": "date"}
        ],
        "columnDefs" : [
            {
                "render": function ( data, type, row ) {
                    if (data == null)
                        return "";
                    else
                        return data;
                },
                "targets": 2
            }
        ],
    });
    
    actionTable = $('#action-table').DataTable({
        "ajax": {
            "url": "GetActionLog",
            "dataSrc": ""
        },
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "columns": [
            {"data": "userUname"},
            {"data": "entryDesc"},
            {"data": "date"}
        ],
        "columnDefs" : [
            {
                "render": function ( data, type, row ) {
                    if (data == null)
                        return "";
                    else
                        return data;
                },
                "targets": 1
            }
        ],
    });
}
function addUser() {
    
}
function updateUser() {
    
}
function deleteUser() {
    
}