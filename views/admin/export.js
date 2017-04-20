app.export = kendo.observable({

    isSubmitBtnEnabled: true,
    isSubmitBtnVisible: true,
    isProcessBtnEnabled: true,
    isProcessBtnVisible: true,

    onBeforeShow: function (e) {
        
    },

    onInit: function (e) {
        initViewEvents(e, this);

        $('#openCSVLink').on('click', function () {
            $('#openCSVLink').css('display', 'none');
        });
        $('#openPDFLink').on('click', function () {
            $('#openPDFLink').css('display', 'none');
        });
    },

    onShow: function (e) {

    },

    onAfterShow: function (e) {
        //afterShowViewEvents(e);
    },

    onHide: function (e) {

    },

    clickSubmitBtn: function (e) {
        this.generateFile('local');
    },

    clickProcessBtn: function (e) {
        this.generateFile('remote');
    },

    generateFile: function (which_db) {

        $('#downloadLink a').css('display', 'none');

        /*** https://craftpip.github.io/jquery-confirm/ ***/
        $.confirm({
            columnClass: 'col-xs-10 col-xs-offset-1',
            title: '',
            content: 'Please select a format for your export file.',
            buttons: {
                csv: {
                    text: 'CSV',
                    btnClass: 'btn-blue',
                    //keys: ['enter', 'shift'],
                    action: function () {
                        export_db(which_db, 'csv', function () {

                        });
                    }
                },
                pdf: {
                    text: 'PDF',
                    btnClass: 'btn-blue',
                    //keys: ['enter', 'shift'],
                    action: function () {
                        export_db(which_db, 'pdf', function () {

                        });
                    }
                },
                cancel: {

                }
            },
            animation: 'opacity',
            closeAnimation: 'opacity'
        });

    }

});