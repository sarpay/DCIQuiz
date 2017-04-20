app.loginExport = kendo.observable({

    fwd: '',
    user: 'dc1',
    pwd: 'meta1',

    isSubmitBtnEnabled: true,
    isSubmitBtnVisible: true,

    reset: function (e) {
        this.set('fwd', '');
        this.set('user', 'dc1');
        this.set('pwd', 'meta1');
    },

    onBeforeShow: function (e) {
        
    },

    onInit: function (e) {
        initViewEvents(e, this);
    },

    onShow: function (e) {
        this.set('fwd', e.view.params.fwd);
    },

    onAfterShow: function (e) {
        afterShowViewEvents(e);
    },

    onHide: function (e) {
        this.reset();
    },

    clickSubmitBtn: function (e) {
        if (validateInput('user', this.user) && validateInput('pwd', this.pwd)) {
            console.log(this.fwd);
            goToView(this.fwd, null, false, true, false, 0);
        } else {
            msg('', 'Wrong Credentials.');
        }
    }

});