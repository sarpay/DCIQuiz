$(document).ready(function () {
    var url = getQSValueOf().url;
    var jObj = JSON.parse(getStorageItem('pdf_data'));
    makePDF(jObj);
});


function makePDF(jObj) {

    // margins:
    // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins

    var body = [];
    var headers = [];
    var headerWidths = [];
    var row = [];
    body.push(headers);
    for (var i = 0; i < jObj.rows.length; i++) {/* loop inside the returned docs list */
        var doc = jObj.rows[i].doc;
        row = [];
        for (var prop in doc) {/* iterate object items */
            var val = doc[prop];/*could be a string or an array*/
            switch (prop) {
                case '_rev':
                    //if (i == 0) {
                    //    headerWidths.push('auto');
                    //    headers.push({ text: 'Last Name', style: 'tableHeader' });
                    //}
                    //row.push(val);
                    break;
                case '_id':
                    if (i == 0) {
                        headerWidths.push('auto');
                        headers.push({ text: 'Date & Time', style: 'tableHeader' });
                    }
                    row.push(formatJsonDateTime(val));
                    break;
                case 'name':
                    if (i == 0) {
                        headerWidths.push('auto');
                        headers.push({ text: 'Name', style: 'tableHeader' });
                    }
                    //val = val + ' ' + doc.last_name;
                    row.push(val);
                    break;
                case 'email':
                    if (i == 0) {
                        headerWidths.push('auto');
                        headers.push({ text: 'E-Mail', style: 'tableHeader' });
                    }
                    row.push(val);
                    break;
                case 'phone':
                    if (i == 0) {
                        headerWidths.push('auto');
                        headers.push({ text: 'Phone', style: 'tableHeader' });
                    }
                    val = formatPhoneNumber(val);
                    row.push(val);
                    break;
                case 'company':
                    if (i == 0) {
                        headerWidths.push('auto');
                        headers.push({ text: 'Company', style: 'tableHeader' });
                    }
                    row.push(val);
                    break;
                case 'score':
                    if (i == 0) {
                        headerWidths.push('auto');
                        headers.push({ text: 'Score', style: 'tableHeader' });
                    }
                    row.push(val);
                    break;
                case 'passed':
                    if (i == 0) {
                        headerWidths.push('auto');
                        headers.push({ text: 'Passed', style: 'tableHeader' });
                    }
                    row.push(val);
                    break;
                //case 'answers':
                //    if (i == 0) {
                //        headerWidths.push('auto');
                //        headers.push({ text: 'Answers', style: 'tableHeader' });
                //    }
                //    row.push(buildAnswersString(val));/*flatten the array*/
                //    break;
            }
        }
        body.push(row);
    }

    //console.log(body);

    var pdf = {
        pageSize: 'LETTER',
        pageOrientation: 'landscape',
        content: [
            { text: 'Header Text', style: 'subheader' },/*pageBreak: 'before', */
            { text: 'TEXT GOES HERE', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
            'You can declare how many rows should be treated as a header. Headers are automatically repeated on the following pages',
            {
                style: 'table',
                table: {
                    // '*'      : take up all the remaining space.
                    // 'auto'   : fit column width to its content.
                    widths: headerWidths,//, '*', '*', '*', '*'
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    body: body
                },
                layout: 'lightHorizontalLines'
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            table: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        }
    }

    pdfMake.createPdf(pdf).download(generateTimeStamp() + '.pdf');

    //console.log(pdf.content[3].table.body);

}