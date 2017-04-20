function isObjValid(obj) {

    if (typeof (obj) === 'undefined' || obj === null) { return false; }
    return true;

}


function query2DimJsonObj(obj, searchColId, searchVal, rtrnValColId) {

    var rtrnVal = null;

    $.each(obj, function (rowIndex, rowObj) { /*** iterates thru each row ***/
        if (rowObj[searchColId] == searchVal) {
            if (rtrnValColId == 'ix') {
                rtrnVal = rowIndex;/* return value's index */
            } else {
                rtrnVal = rowObj[rtrnValColId];/* return value's column id */
            }
            return false;/* break/exit the loop */
        }
    });

    return rtrnVal;

}


function getQSValueOf() {

    var qsKeyValuePair = window.parent.location.search.replace('?', '').split('&');
    var qsObject = {};
    if (qsKeyValuePair !== '') {
        for (i = 0; i < qsKeyValuePair.length; i++) {
            qsObject[qsKeyValuePair[i].split('=')[0]] = qsKeyValuePair[i].split('=')[1];
        }
    }

    return qsObject;

}


function buildAnswersString(arr) {

    /* flatten the array */
    var answers = [];
    for (var y = 0; y < arr.length; y++) {
        answers[y] = (y + 1) + ':' + arr[y].toUpperCase();
    }
    return answers.join(' | ');

}

// Returns a csv from an array of objects with
// values separated by comma and rows separated by newlines
function json2csv(array) {

    // Use first element to choose the keys and the order
    var keys = Object.keys(array.rows[0].doc);

    // Build header
    var csv = keys.join(",") + "\n";

    // Add the rows
    var rows = array.rows;
    rows.forEach(function (row, ix1) {
        var doc = rows[ix1].doc;
        keys.forEach(function (key, ix) {
            //console.log(key + ':' + row.doc[key]);
            if (ix) csv += ",";
            switch (key) {
                case 'answers':
                    if (Array.isArray(row.doc[key])) {
                        csv += buildAnswersString(row.doc.answers);/*flatten the array*/
                    }
                    break;
                case 'phone':
                    csv += formatPhoneNumber(row.doc.phone);
                    break;
                default:
                    csv += row.doc[key].toString().replace(/,/g, '-');/*replace commas with dashes*/
            }
        });
        csv += "\n";
    });

    //console.log(csv);

    return csv;
}


function generateGuid() {

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();

}


function generateTimeStamp() {

    var ts = new Date().toJSON();
    ts = ts.substr(0, 23);
    ts = ts.replace(/\./g, '-');
    ts = ts.replace(/:/g, '-');
    ts = ts.replace(/T/, '-');

    return ts;

}


function formatJsonDateTime(val) {

    var dt = val.substr(0, 16).replace(/T/, ' ');/*remove seconds*/
    var dd = dt.substr(8, 2);
    var mm = dt.substr(5, 2);
    var yyyy = dt.substr(0, 4);
    dt = mm + '.' + dd + '.' + yyyy + dt.substr(10);

    return dt;

}


function formatPhoneNumber(s) {

    var s2 = ("" + s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? "" : "(" + m[1] + ") " + m[2] + "-" + m[3];

}