var userTable;
var accessTable;
var actionTable;
function initialize() {
    document.getElementById("global-username").innerHTML = userFullName + " ";
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
    var classID = document.getElementById("add-class").value;
    var uname = document.getElementById("add-username").value;
    var pword = document.getElementById("add-password").value;
    var nameTitle = document.getElementById("add-name-title").value;
    var nameFirst = document.getElementById("add-name-first").value;
    var nameOther = document.getElementById("add-name-other").value;
    var nameLast = document.getElementById("add-name-last").value;
   
    if (classID === "" || uname === "" ||
            pword === "" ) {
        showAndDismissAlert("danger", "<strong>Add User failed.</strong> Please complete the form.");
    }
    else {
        $.ajax({
            type: "GET",
            url: "SaveUser",
            data: {
                classID: classID,
                uname: uname,
                pword: pword,
                nameTitle: nameTitle.replace(".", ""),
                nameFirst: nameFirst,
                nameOther: nameOther,
                nameLast: nameLast
            },
            success: function (response) {
                showAndDismissAlert("success", "<strong>Mission Details</strong> have been <strong>saved.</strong>");
            }
        });
    }
}
function updateUser() {
    
}
function deleteUser() {
    
}