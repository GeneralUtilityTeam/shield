// For: SHIELD
// V 2.4.1 , Updated as of 10/9/15

// -- STRING MANIUPLATION
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
function breakString(str, breakAt) {  //breaks a string at point 'breakAt' and inserts a \n
    var strArray = str.split(" ");
    var result = "";
    var temp = "";
    if (str.length < breakAt)
        return str;
    for (var x = 0; x < strArray.length; x++) {

        temp += strArray[x] + " ";
        if (temp.length > breakAt) {
            if (strArray[x + 1] != strArray.length)
                temp += '\n';
            result += temp;
            temp = "";
        }
    }
    return result;
}
function isEqualRaw(str1, str2) {
    if (str1 == null || str2 == null)
        return false;
    else if (str1.toLowerCase().replace(' ', '-') == str2.toLowerCase().replace(' ', '-'))
        return true;
    else
        return false;
}
// -- UI DOM CONTROLS
function clearTableRows(tableName) {
    table = document.getElementById(tableName);
    var rowCount = table.rows.length;
    for (var x = 1; x < rowCount; x++) {
        table.deleteRow(1);
    }
}

// -- INPUT VALIDATION
function numbersonly(myfield, e, dec) { //use in conjunction with input attribute "onKeyPress='return numbersonly(this,event)" to restrict a user to numbers
    var key;
    var keychar;

    if (window.event)
        key = window.event.keyCode;
    else if (e)
        key = e.which;
    else
        return true;
    keychar = String.fromCharCode(key);

// control keys
    if ((key == null) || (key == 0) || (key == 8) ||
            (key == 9) || (key == 13) || (key == 27))
        return true;

// numbers
    else if ((("0123456789").indexOf(keychar) > -1))
        return true;

// decimal point jump
    else if (dec && (keychar == "."))
    {
        myfield.form.elements[dec].focus();
        return false;
    }
    else
        return false;
}
function numbersonlycontact(myfield, e, dec) {// allows the hyphen (-)
    var key;
    var keychar;

    if (window.event)
        key = window.event.keyCode;
    else if (e)
        key = e.which;
    else
        return true;
    keychar = String.fromCharCode(key);

// control keys
    if ((key == null) || (key == 0) || (key == 8) ||
            (key == 9) || (key == 13) || (key == 27) || (key == 45))
        return true;

// numbers
    else if ((("0123456789").indexOf(keychar) > -1))
        return true;

// decimal point jump
    else if (dec && (keychar == "."))
    {
        myfield.form.elements[dec].focus();
        return false;
    }
    else
        return false;
}
function numbersonlydouble(myfield, e, dec) {// allows the period (.)
    var key;
    var keychar;

    if (window.event)
        key = window.event.keyCode;
    else if (e)
        key = e.which;
    else
        return true;
    keychar = String.fromCharCode(key);

// control keys
    if ((key == null) || (key == 0) || (key == 8) ||
            (key == 9) || (key == 13) || (key == 27) ||
            (key == 46))
        return true;

// numbers
    else if ((("0123456789").indexOf(keychar) > -1))
        return true;

// decimal point jump
    else if (dec && (keychar == "."))
    {
        myfield.form.elements[dec].focus();
        return false;
    }
    else
        return false;
}
function checkIfEmpty(str) { //checks if the str is empty
    if (str == null || str === 'undefined')
        return true;
    var clearStr = str.replace(/\s/g, '');
    if (clearStr == "")
        return true;
    else
        return false;
}
function replaceIfEmpty(str) { //checks if the str is empty
    if (str == null || str === 'undefined')
        return "";
    var clearStr = str.replace(/\s/g, '');
    if (clearStr == "")
        return "";
    else
        return str;
}

// -- JSON
function toJSON(obj) {  //converts and object into a JSON string
    return JSON.stringify(obj, null, 4);
}

// -- GEOCODER; requires global var geocode and function geocodeSuccess(result)
function initializeGeocoder() {
    if (geocoder == null) {
        geocoder = new google.maps.Geocoder();
    }
}
function geocodeResultString(str) { // Takes String Address; Returns geocode results
    geocoder.geocode({
        'address': str
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            geocodeSuccess(results[0]);
        } else {
            return null;
        }
    });
}
function geocodeResultLatLng(latLng) { // Runs a search based on a mouse click event
    geocoder.geocode({
        latLng: latLng
    }, function (results) {
        if (results && results.length > 0) {
            geocodeSuccess(results[0]);
        } else {
            return null;
        }
    });
}
function generateAreaObject(result) { //This method takes in the address_components of either a Marker or Searchbar and shortens it into a usable array
    var arr = result.address_components;
    if (arr != null) {
        var area = new Object();
        area.latLng = result.geometry.location;
        area.viewport = result.geometry.viewport;
        arr.forEach(function (comp) {
            comp.types.forEach(function (type) {
                if (type != 'political') {
                    switch (type) {
                        case 'street_number':
                            area.level8 = comp.long_name;
                            break;
                        case 'route':
                            area.level7 = comp.long_name;
                            break;
                        case 'neighborhood':
                            area.level6 = comp.long_name;
                            break;
                        case 'sublocality':
                            area.level5 = comp.long_name;
                            break;
                        case 'locality':
                            area.level4 = comp.long_name;
                            break;
                        case 'administrative_area_level_2':
                            area.level3 = comp.long_name;
                            break;
                        case 'administrative_area_level_1':
                            area.level2 = comp.long_name;
                            break;
                        case 'country':
                            area.level1 = comp.long_name;
                            break;
                    }
                }
            });

        });
        return area;
    }
    return null;
}
function generateFullAddress(area) { // Converts Address components of an area into a String that contains them 
    var level8 = (!checkIfEmpty(area.level8) ? area.level8 + ", " : "");
    var level7 = (!checkIfEmpty(area.level7) ? area.level7 + ", " : "");
    var level6 = (!checkIfEmpty(area.level6) ? area.level6 + ", " : "");
    var level5 = (!checkIfEmpty(area.level5) ? area.level5 + ", " : "");
    var level4 = (!checkIfEmpty(area.level4) ? area.level4 + ", " : "");
    var level3 = (!checkIfEmpty(area.level3) ? area.level3 + ", " : "");
    var level2 = (!checkIfEmpty(area.level2) ? area.level2 + ", " : "");
    var level1 = area.level1;
    var result = level8 + level7 + level6 + level5 + level4 + level3 + level2 + level1;
    return result;
}