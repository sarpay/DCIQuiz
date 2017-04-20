app.result = kendo.observable({

    /***************************************/
    /*** data-points ***/
    /***************************************/
    name: '',
    company: '',
    correctsCount: 0,
    wrongsCount: 0,
    skippedCount: 0,
    score: 0,
    passed: false,
    isBadResultVisible: false,
    isGoodResultVisible: false,
    isSubmitBtnEnabled: true,
    isSubmitBtnVisible: true,
    btnText: '',

    reset: function (e) {
        this.set('name', '');
        this.set('company', '');
        this.set('correctsCount', 0);
        this.set('wrongsCount', 0);
        this.set('skippedCount', 0);
        this.set('score', 0);
        this.set('passed', false);
        this.set('isBadResultVisible', false);
        this.set('isGoodResultVisible', false);
        this.set('btnText', '');
        $('#scoreArch').empty();
        $('#correctsDonut > .donut').empty();
        $('#wrongsDonut > .donut').empty();
        $('#skippedDonut > .donut').empty();
    },

    /***************************************/
    /*** views (in the order of trigger) ***/
    /***************************************/
    onBeforeShow: function (e) {
        this.reset();

        var dm = this;
        var doc_id = getStorageObj('doc')._id;
        select_doc(
            doc_id,
            function (doc) {
                dm.set('name', doc.name);
                dm.set('company', doc.company);
            }
        );
    },

    onInit: function (e) {
        //console.log('onInit');
        initViewEvents(e, this);
    },

    onShow: function (e) {
        //console.log('onShow');
    },

    onAfterShow: function (e) {

        var dm = this;

        dm.calcResults(dm, function () {

            dm.set('score', Math.round((dm.correctsCount / CORRECT_ANSWERS.length) * 100));
            if (dm.score >= PASS_SCORE) { dm.set('passed', true); }

            var doc_id = getStorageObj('doc')._id;
            select_doc(
                doc_id,
                function (doc) {
                    doc.score = dm.score;
                    doc.passed = (dm.passed ? 'Yes' : 'No');
                    update_doc(doc, function () {
                        setStorageObj('doc', doc);
                        setTimeout(function () {
                            set_gauge(dm.score, dm.correctsCount, dm.wrongsCount, dm.skippedCount);
                            if (dm.passed) {
                                dm.set('isGoodResultVisible', true);
                                dm.set('btnText', 'REDEEM REWARD');
                            } else {
                                dm.set('isBadResultVisible', true);
                                dm.set('btnText', 'DONE');
                            }
                        }, 500);
                    });
                }
            );

        });
        
    },

    onHide: function (e) {
        //console.log('onBeforeHide');
    },

    calcResults: function (dm, proceed) {
        var doc_id = getStorageObj('doc')._id;
        select_doc(
            doc_id,
            function (doc) {
                for (var i = 0; i < doc.answers.length; i++) {
                    if (doc.answers[i] === CORRECT_ANSWERS[i]) {
                        dm.set('correctsCount', dm.correctsCount + 1);
                    } else {
                        if (doc.answers[i] === 'N') {
                            dm.set('skippedCount', dm.skippedCount + 1);
                        } else {
                            dm.set('wrongsCount', dm.wrongsCount + 1);
                        }
                    }
                }
                proceed();
            }
        );
    },

    clickSubmitBtn: function (e) {
        if (this.passed) {
            goToView('profile', null, false, true, false, 0);
        } else {
            resetSession(function () {
                goToView('splash', null, false, true, true, 0);
            });
        }
    }

});