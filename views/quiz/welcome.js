app.welcome = kendo.observable({

    /***************************************/
    /*** data-points ***/
    /***************************************/
    name: '',
    email: '',
    company: '',
    phone: '',

    isSubmitBtnEnabled: true,
    isSubmitBtnVisible: true,

    reset: function (e) {
        this.set('name', '');
        this.set('email', '');
        this.set('company', '');
        this.set('phone', '');
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
        //selectMenuItem(getCurrentViewId());
    },

    onShow: function (e) {
        //console.log('onShow');
        this.reset();
    },

    onAfterShow: function (e) {
        //console.log('onAfterShow');
        afterShowViewEvents(e);
    },

    onHide: function (e) {
        //console.log('onBeforeHide');
    },

    clickSubmitBtn: function (e) {
        /* cannot accept e bec. clickGoBtn(ui.js) func. also calls this */

        var dm = this;
        //var selectId = $('#formUpdateGender_dd_genders').val();
        //var selectTxt = $('#formUpdateGender_dd_genders option:selected').text();

        /*** validations ***/
        dm.set('nameBadgeVisible', false);
        dm.set('emailBadgeVisible', false);
        dm.set('companyBadgeVisible', false);
        dm.set('phoneBadgeVisible', false);

        var valid = true;
        if (!validateInput('name', dm.name)) {
            //valid = false; dm.set('nameBadgeVisible', true);
            dm.set('name', '-');
        }
        if (!validateInput('email', dm.email)) {
            //valid = false; dm.set('emailBadgeVisible', true);
            dm.set('email', '-');
        }
        if (!validateInput('company', dm.company)) {
            //valid = false; dm.set('companyBadgeVisible', true);
            dm.set('company', '-');
        }
        if (!validateInput('phone', dm.phone)) {
            //valid = false; dm.set('phoneBadgeVisible', true);
            dm.set('phone', '-');
        }

        /*** update database ***/
        if (valid) {
            //if (isObjValid(getStorageObj('doc'))) {
            //    var doc_id = getStorageObj('doc')._id;
            //    select_doc(
            //        doc_id,
            //        function (doc) {
            //            doc.name = dm.name;
            //            doc.email = dm.email;
            //            doc.company = dm.company;
            //            doc.phone = dm.phone;
            //            update_doc(doc, function () {
            //                setStorageObj('doc', doc);/*used for session management*/
            //                goToView('q1', null, false, true, false, 0);
            //            });
            //        }
            //    );
            //} else {
                create_new_user(
                    dm.name,
                    dm.email,
                    dm.company,
                    dm.phone,
                    function (doc) {
                        setStorageObj('doc', doc);/*used for session management*/
                        goToView('q1', null, false, true, false, 0);
                    }
                );
            //}
        }
    }

});