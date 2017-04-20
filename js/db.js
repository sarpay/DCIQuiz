var local_db = new PouchDB('dci_quiz');
var remote_db = new PouchDB('https://couchdb-e98918.smileupps.com/dci_quiz');

function create_new_user(name, email, company, phone, proceed) {
    var new_id = new Date().toJSON();
    var new_doc = {
        "_id": new_id,
        "name": name,
        "company": company,
        "phone": phone,
        "address": '',
        "email": email,
        "answers": [],
        "score": 'n/a',
        "passed": 'No'
    };
    local_db.put(new_doc).then(function () {/* write to local db*/
        local_db.get(new_id).then(function (doc) { /* read from local db */
            //console.log(doc);
            proceed(doc);
        }).catch(function (err) {
            msg('DB ERROR', err);
        });
    }).catch(function (err) {
        msg('DB ERROR', err);
    });
}


function update_doc(row, proceed) {

    /*first, get the revision number*/
    local_db.get(row._id).then(function (doc) {
        row._rev = doc._rev;// rev number changes everytime.
        return local_db.put(row);
    }).then(function (response) {
        // handle response
        proceed();
    }).catch(function (err) {
        msg('DB ERROR', err);
    });

}


function select_doc(_id, proceed) {
    local_db.get(_id).then(function (doc) {
        proceed(doc);
    }).catch(function (err) {
        msg('DB ERROR', err);
    });
}


function sync_w_server(proceed) {
    if (navigator.onLine) {
        /* replicate local to server */
        local_db.replicate.to(remote_db).on('complete', function () {
            msg('', 'Your local database was successfully synced with the central remote database.');
            proceed();
        }).on('error', function (err) {
            msg('DB ERROR', err);
            proceed();
        });
    } else {
        msg('', 'You cannot sync with central database while offline.');
        proceed();
    }
}


function export_db(which_db, type, proceed) {

    if (!navigator.onLine && which_db == 'remote') {

        msg('', 'You cannot export from central database while offline.');
        proceed();

    } else {

        $('#downloadLink span').css('display', 'block');

        var db;
        switch (which_db) {
            case 'local':
                db = local_db;
                break;
            case 'remote':
                db = remote_db;
                break;
        }

        db.allDocs({
            include_docs: true,
            attachments: false
        }).then(function (jObj) {
            //console.log(JSON.stringify(jObj));
            if (jObj.rows.length > 0) {
                if (type === 'csv') {

                    // Create CSV and inititate download
                    var fileName = generateTimeStamp() + '.csv';
                    var csv = json2csv(jObj);

                    //$('#openCSVLink').attr('href', 'data:attachment/csv;charset=utf-8,' + encodeURIComponent(csv));
                    //$('#openCSVLink').show();
                    // -- OR --
                    var csvData = new Blob([csv], { type: 'text/csv' });
                    var csvURL = window.URL.createObjectURL(csvData);
                    $('#openCSVLink')
                        .attr('href', csvURL)
                        .attr('download', fileName)
                        .css('display', 'block');

                    $('#downloadLink span').css('display', 'none');

                    msg('', 'Successfully generated your file and it\'s ready for download.');
                    proceed();

                } else if (type === 'pdf') {

                    setStorageItem('pdf_data', JSON.stringify(jObj));
                    $('#openPDFLink').css('display', 'block');
                    $('#downloadLink span').css('display', 'none');

                    msg('', 'Successfully generated your file and it\'s ready for download.');
                    proceed();

                }
            } else {
                //alert(which_db + ' database is empty!');
                $('#downloadLink span').css('display', 'none');
                var db = (which_db == 'remote' ? 'Remote' : 'Local');
                var msgTxt = db + ' database is empty.';
                if (which_db == 'local') {
                    msgTxt += '<br />No one has taken the quiz yet!';
                } else if (which_db == 'remote') {
                    msgTxt += '<br />Please "Sync" first.';
                }
                msg('', msgTxt);
                proceed();
            }
        }).catch(function (err) {
            msg('DB ERROR', err);
            proceed();
        });

    }

}


function delete_all_rows(which_db) {

    var db;
    switch (which_db) {
        case 'local':
            db = local_db;
            break;
        case 'remote':
            db = remote_db;
            break;
    }

    db.allDocs({
        include_docs: true,
        attachments: true
    }).then(function (data) {
        // handle result

        var table = [];
        for (var i = 0; i < data.rows.length; i++) {

            /* loop inside the returned docs list */
            var doc = data.rows[i].doc;
            var _id = doc._id;
            var _rev = doc._rev;

            /* create the list of rows to be deleted */
            var row = {
                _deleted: true,
                _rev: _rev,
                _id: _id
            };
            table.push(row);
        }

        //console.log(JSON.stringify(table));

        db.bulkDocs(table).then(function (result) {
            // handle result
            console.log('successful delete');//result

            db.compact().then(function (result) {
                console.log('successful compact');//result
            }).catch(function (err) {
                console.log(err);
            });

        }).catch(function (err) {
            console.log(err);
        });

    }).catch(function (err) {
        console.log(err);
    });

}


var downloadFile = function (filename, content) {
    //var blob = new Blob([content]);
    //var evt = document.createEvent("HTMLEvents");
    //evt.initEvent("click");
    //$("<a>", {
    //    download: filename,
    //    href: webkitURL.createObjectURL(blob)
    //}).get(0).dispatchEvent(evt);

    //var blob = new Blob([content]);
    //var a = window.document.createElement("a");
    //a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
    //a.download = filename;
    //document.body.appendChild(a);
    //a.click();
    //document.body.removeChild(a);

    //var csvData = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    //var csvURL = window.URL.createObjectURL(csvData);
    //var tempLink = document.createElement('a');
    //tempLink.href = csvURL;
    //tempLink.setAttribute('download', 'ex.csv');
    //tempLink.click();

    var tempAnc = document.createElement('a');
    tempAnc.href = 'data:attachment/csv,' + encodeURIComponent(content);
    tempAnc.target = '_blank';
    tempAnc.download = filename;
    tempAnc.click();
};