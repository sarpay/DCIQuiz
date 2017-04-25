app.loginSync = kendo.observable({

    fwd: '',
    user: '',
    pwd: '',

    isSubmitBtnEnabled: true,
    isSubmitBtnVisible: true,

    reset: function (e) {
        this.set('fwd', '');
        this.set('user', '');
        this.set('pwd', '');
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