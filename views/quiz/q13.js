app.q13 = kendo.observable({

    /***************************************/
    /*** data-points ***/
    /***************************************/
    qIX: 12,
    answer: '',

    isSubmitBtnEnabled: true,
    isSubmitBtnVisible: true,

    reset: function (e) {
        this.set('answer', '');
    },

    /***************************************/
    /*** views (in the order of trigger) ***/
    /***************************************/
    onBeforeShow: function (e) {
        //console.log('beforeshow');
    },

    onInit: function (e) {
        //console.log('onInit');
        initViewEvents(e, this);
    },

    onShow: function (e) {
        //console.log('onShow');
    },

    onAfterShow: function (e) {
        //console.log('onAfterShow');
    },

    onHide: function (e) {
        //console.log('onBeforeHide');
    },

    clickSubmitBtn: function (e) {
        update_answers(
            this.qIX,
            this.answer,
            function () {
                goToView('q14', null, false, true, false, 0);
            }
        );
    }

});