app.splash = kendo.observable({

    /***************************************/
    /*** views (in the order of trigger) ***/
    /***************************************/
    onBeforeShow: function (e) {
        //console.log('beforeshow');
    },

    onInit: function (e) {
        //console.log('onInit');
    },

    onShow: function (e) {
        //console.log('onShow');
    },

    onAfterShow: function (e) {
        //console.log('onAfterShow');
        afterShowViewEvents(e);
    },

    onHide: function (e) {
        //console.log('onBeforeHide');
    },

    clickStartBtn: function (e) {
        goToView('welcome', null, false, true, false, 0);
    }

});