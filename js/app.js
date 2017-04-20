//var local_db = new PouchDB('free_coffee_survey');
//var remote_db = new PouchDB('https://couchdb-e98918.smileupps.com/free_coffee_survey');

(function () {

    var app = {
        data: {}
    };

    window.addEventListener('online', function () {
        //msg('DEV ALERT', "you're online");
        //$('#btnUpload').prop('disabled', false);
    });
    window.addEventListener('offline', function () {
        //msg('DEV ALERT', "you're offline");
        //$('#btnUpload').prop('disabled', true);
    });

    window.app = app;

    $(document).ready(function () {
        
    });

}());


//window.onbeforeunload = function () {

//    return false;

//}


window.onerror = function (message, url, lineNumber) {

    var n = url.lastIndexOf("/") + 1;
    var fileName = url.substring(n, url.length);
    var msgTxt = "\"" + message + "\" on line " + lineNumber + " in \"" + fileName + "\"";

    msg('DEBUG MESSAGE', msgTxt);

}