var srcJSON = [{"datePublish": "2010-01-01", "type": "Area Study", "name": "Davao del Sur Area Study 2010", "description": "Area study conducted on the Davao del Sur area by the 10th Infantry (AGILA) division", "id": 1},
    {"datePublish": "2010-01-01", "type": "Interview", "name": "Davao del Sur Area Study 2010", "description": "Area study conducted on the Davao del Sur area by the 10th Infantry (AGILA) division", "id": 2}];

function initialize() {
    document.getElementById("global-username").innerHTML = userFullName + " ";
    showAndDismissAlert('success', 'Data Sources of <strong>SHIELD</strong>');
    var dropdown = document.getElementById("source-type");
    clssJSON.forEach(function(conf){
        var option = document.createElement("option");
        option.setAttribute("label", conf.valueText);
        option.setAttribute("value", conf.id);
        dropdown.appendChild(option);
    });
}

//Data Table Function
$(document).ready(function () {
    table = $('#source-table').DataTable({
        "ajax": {
            "url": "GetAllSources",
            "dataSrc": ""
        },
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "columns": [
            {"data": "classDesc"},
            {"data": "title"},
            {"data": "desc"},
            {"data": "published"}
        ]
    });
    $('#source-table tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        window.location.assign("ANSourceView?id=" + data.id);
    });
});

function saveSource() {
    var sourceClass = document.getElementById("source-type").value;
    var sourceName = document.getElementById("source-name").value;
    var sourceDesc = document.getElementById("source-description").value;
    var sourceDate = document.getElementById("source-date").value;
    
    if(checkIfEmpty(sourceName) && checkIfEmpty(sourceDesc) && (sourceDate.value==null)){
        showAndDismissAlert("warning", "Please input source name");
        showAndDismissAlert("warning", "Please input source description");
        showAndDismissAlert("warning", "Please input source date");
    } else if(checkIfEmpty(sourceName) && checkIfEmpty(sourceDesc)){
        showAndDismissAlert("warning", "Please input source name");
        showAndDismissAlert("warning", "Please input source description");
    }else if(checkIfEmpty(sourceDesc)){
        showAndDismissAlert("warning", "Please input source description");
    }else if(sourceDate.value == null){
        showAndDismissAlert("warning", "Please input source date");
    }else if (checkIfEmpty(sourceName)){
        showAndDismissAlert("warning", "Please input source name");
    }
    
    else{
    
    $.ajax({
        type: "GET",
        url: "SaveSource",
        data: {
            class : sourceClass,
            title: sourceName,
            desc: sourceDesc,
            published: sourceDate
        },
        success: function (response) {
            $('#addSource').modal('hide');
            showAndDismissAlert("success", "<strong>New Source</strong> has been <strong>added.</strong>");
            table.ajax.reload();
        }
    });
    }
}