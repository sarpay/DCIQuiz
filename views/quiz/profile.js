app.profile = kendo.observable({

    /***************************************/
    /*** data-points ***/
    /***************************************/
    name: '',
    email: '',
    company: '',
    phone: '',
    address: '',

    isSubmitBtnEnabled: true,
    isSubmitBtnVisible: true,

    reset: function (e) {
        this.set('name', '');
        this.set('email', '');
        this.set('company', '');
        this.set('phone', '');
        this.set('address', '');
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
        var dm = this;
        var doc_id = getStorageObj('doc')._id;
        select_doc(
            doc_id,
            function (doc) {
                dm.set('name', doc.name);
                dm.set('email', doc.email);
                dm.set('company', doc.company);
                dm.set('phone', doc.phone);
            }
        );
    },

    onAfterShow: function (e) {
        //console.log('onAfterShow');
    },

    onHide: function (e) {
        //console.log('onBeforeHide');
    },

    clickSubmitBtn: function (e) {
        
        var dm = this;

        /*** validations ***/
        dm.set('nameBadgeVisible', false);
        dm.set('emailBadgeVisible', false);
        dm.set('companyBadgeVisible', false);
        dm.set('phoneBadgeVisible', false);
        dm.set('addressBadgeVisible', false);
        var valid = true;
        if (!validateInput('name', dm.name)) {
            valid = false; dm.set('nameBadgeVisible', true);
        }
        if (!validateInput('email', dm.email)) {
            valid = false; dm.set('emailBadgeVisible', true);
        }
        if (!validateInput('company', dm.company)) {
            valid = false; dm.set('companyBadgeVisible', true);
        }
        if (!validateInput('phone', dm.phone)) {
            valid = false; dm.set('phoneBadgeVisible', true);
        }
        if (!validateInput('address', dm.address)) {
            valid = false; dm.set('addressBadgeVisible', true);
        }
        
        /*** update database ***/
        if (valid) {
            var doc_id = getStorageObj('doc')._id;
            select_doc(
                doc_id,
                function (doc) {
                    doc.name = dm.name;
                    doc.email = dm.email;
                    doc.company = dm.company;
                    doc.phone = dm.phone;
                    doc.address = dm.address;
                    update_doc(doc, function () {
                        resetSession(function () {
                            goToView('splash', null, false, true, true, 0);
                            setTimeout(function () {
                                msg('', '<div class="done-check-div"></div><div style="width: 100%; text-align: center; margin-top: 15px">Hope you\'ll enjoy our little gift!</div>');
                            }, TIMEOUT_BEFORE_PAGE_SWIPES);
                        });
                    });
                }
            );
        }
        
    }

});