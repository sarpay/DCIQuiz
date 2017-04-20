app.sync = kendo.observable({

    isSubmitBtnEnabled: true,
    isSubmitBtnVisible: true,

    onBeforeShow: function (e) {
        
    },

    onInit: function (e) {
        initViewEvents(e, this);
    },

    onShow: function (e) {

    },

    onAfterShow: function (e) {
        //afterShowViewEvents(e);
    },

    onHide: function (e) {

    },

    clickSubmitBtn: function (e) {
        $('#syncBlock').css('display', 'block');
        sync_w_server(function () {
            $('#syncBlock').css('display', 'none');
        });
    }

});