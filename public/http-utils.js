// Perform an http get using pure javascript
// https://stackoverflow.com/questions/247483/http-get-request-in-javascript
function httpGetAsync(theUrl, callback) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, ASYNCHRONOUS);
    xmlHttp.send(null);
}

// Based on https://stackoverflow.com/a/24468752
// Request body is an object which will be converted to json
function httpPostAsync(theUrl, requestBody, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", theUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            callback(json);
        }
    };;
    let jsonBody = JSON.stringify(requestBody);
    xhr.send(jsonBody);
}