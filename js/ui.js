var PREV_VIEWS = [];/* keeps record of the browser history stack */
var TIMEOUT_BEFORE_PAGE_SWIPES = 600;

var NAV_LIBRARY = {};
NAV_LIBRARY.items = [];
NAV_LIBRARY.items.push({ key: 'splash', viewId: 'splashView', menuAccess: true, transType: 'slide', transDirections: 'left-right', enableSwipe: false });
NAV_LIBRARY.items.push({ key: 'welcome', viewId: 'welcomeView', menuAccess: true, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'q1', viewId: 'q1View', menuAccess: false, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'q2', viewId: 'q2View', menuAccess: false, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'q3', viewId: 'q3View', menuAccess: false, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'q4', viewId: 'q4View', menuAccess: false, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'q5', viewId: 'q5View', menuAccess: false, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'q6', viewId: 'q6View', menuAccess: false, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'q7', viewId: 'q7View', menuAccess: false, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'q8', viewId: 'q8View', menuAccess: false, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'q9', viewId: 'q9View', menuAccess: false, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'q10', viewId: 'q10View', menuAccess: false, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'q11', viewId: 'q11View', menuAccess: false, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'q12', viewId: 'q12View', menuAccess: false, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'q13', viewId: 'q13View', menuAccess: false, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'q14', viewId: 'q14View', menuAccess: false, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'q15', viewId: 'q15View', menuAccess: false, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'result', viewId: 'resultView', menuAccess: false, transType: 'slide', transDirections: 'left-right' });
NAV_LIBRARY.items.push({ key: 'profile', viewId: 'profileView', menuAccess: true, transType: 'slide', transDirections: 'left-right' });

NAV_LIBRARY.items.push({ key: 'loginSync', viewId: 'loginSyncView', menuAccess: true, transType: 'slide', transDirections: 'left-right', enableSwipe: false });
NAV_LIBRARY.items.push({ key: 'loginExport', viewId: 'loginExportView', menuAccess: true, transType: 'slide', transDirections: 'left-right', enableSwipe: false });
NAV_LIBRARY.items.push({ key: 'sync', viewId: 'syncView', menuAccess: true, transType: 'slide', transDirections: 'left-right', enableSwipe: false });
NAV_LIBRARY.items.push({ key: 'export', viewId: 'exportView', menuAccess: true, transType: 'slide', transDirections: 'left-right', enableSwipe: false });

//NAV_LIBRARY.items.push({ key: 'about', viewId: 'aboutView', url: 'views/about.html', menuAccess: true, transType: 'slide', transDirections: 'left-right', enableSwipe: false });


$(function () {
    /*http://docs.telerik.com/kendo-ui/api/javascript/mobile/application*/
    /*http://docs.telerik.com/kendo-ui/controls/hybrid/native-scrolling#known-limitations*/
    app.mobileApp = new kendo.mobile.Application(document.body, {
        skin: 'nova',
        initial: 'splashView',
        useNativeScrolling: false,
        //loading: '<h1>Yükleniyor</h1>'/* loading text won't show if <h1> tags are removed! */
        loading: false, /* does not show loader mask unless it's manually called for */
        init: function () {
            
        }
    });
});


function getCurrentView() {

    var view = app.mobileApp.view();
    return view;

}


function getCurrentViewId() {

    var viewId = app.mobileApp.view().content[0].parentElement.id;
    return viewId;
    /*
    -- OR --
    var url = window.location.href;
    var viewId = url.substr(url.indexOf('#', 0) + 1);
    return viewId;
    */

}


function navBarBtnClick(e) {

    var data = e.button.data();
    var actionType = data.actiontype;
    var destPage = data.destpage;
    var qsParams = data.qsparams;

    switch (actionType) {
        case 'go-to-view':
            //goToView(destPage, qsParams, false, true, false, 0);
            break;
        case 'go-back':
            goBack();
            break;
        case 'refresh-view':
            //refreshView();
            break;
        case 'open-drawer':
            toggleDrawer('open');
            break;
    }

}


function toggleDrawer(action) {

    if (action == 'open') {
        $('#appDrawer').data('kendoMobileDrawer').show();
    } else if (action == 'close') {
        $('#appDrawer').data('kendoMobileDrawer').hide();
    }

}


function goToView(page, params, replace, animate, resetHistory, ms) {

    //var browserHistoryArray = window.app.mobileApp.pane.history;
    //console.log(browserHistoryArray[browserHistoryArray.length - 1]);/* shows the latest in stack */

    /* keep or reset history view log */
    var viewId = getCurrentViewId();
    if (resetHistory) { PREV_VIEWS = [] } else { PREV_VIEWS.push(viewId) }

    /* query for the destination view's id */
    var destViewId = query2DimJsonObj(NAV_LIBRARY.items, 'key', page, 'viewId');
    if (isObjValid(params)) {
        if (params.length > 0) {
            destViewId += '?' + params
        }
    }

    /* query for transition type and direction */
    var transType = query2DimJsonObj(NAV_LIBRARY.items, 'key', page, 'transType');
    var transDirections = query2DimJsonObj(NAV_LIBRARY.items, 'key', page, 'transDirections').split('-');
    var transDirection = transDirections[0];
    transDirection = (transDirection == null ? 'left' : transDirection);

    /* determine timeout value */
    ms = (isObjValid(ms) ? ms : 0);

    setTimeout(function () {

        var transition = null;
        if (animate) {
            switch (transDirection) {
                case 'left':
                    transition = 'slide:left';
                    break;
                case 'up':
                    transition = 'overlay:up';
                    break;
                default:
                    transition = 'slide:left';
                    break;
            }
            /* transition effect options:
                ,'slide:left|right'
                ,'zoom' (includes header and footer)
                ,'fade' (includes header and footer)
                ,'overlay:down|up|right|left'
            */
        }

        if (replace) {
            /*
            replace: Navigate to local or to remote view.
            The view will replace the current one in the history stack.
            */
            app.mobileApp.replace(destViewId, transition);
            //NEXT_PAGE_ID = page;
        } else {
            app.mobileApp.navigate(destViewId, transition);
            //NEXT_PAGE_ID = page;
        }

    }, ms);

}


function goBack() {

    /* get current page properties */
    var currentViewId = getCurrentViewId();
    var previousPageId = query2DimJsonObj(NAV_LIBRARY.items, 'viewId', currentViewId, 'key');

    /* query for the destination view's id */
    /* back button on these views always go back to the specified view. */
    //var exceptions = {};
    //exceptions.items = []
    //exceptions.items.push({ viewId: 'signInView', backViewId: 'welcomeView' });

    var destViewId;
    //var backViewId = query2DimJsonObj(exceptions.items, 'viewId', currentViewId, 'backViewId');
    //if (isObjValid(backViewId)) {
    //    destViewId = backViewId;
    //} else {
        destViewId = PREV_VIEWS[PREV_VIEWS.length - 1];
    //}

    /* acquire transition type and direction */
    var transType = query2DimJsonObj(NAV_LIBRARY.items, 'viewId', currentViewId, 'transType');
    var transDirections = query2DimJsonObj(NAV_LIBRARY.items, 'viewId', currentViewId, 'transDirections').split('-');
    var transDirection = transDirections[1];
    transDirection = (transDirection == null ? 'right' : transDirection);

    /* perform navigation */
    var transition = null;
    switch (transDirection) {
        case 'right':
            transition = 'slide:right';
            break;
        case 'down':
            transition = 'overlay:down';
            break;
        default:
            transition = 'slide:right';
            break;
    }

    if (isObjValid(destViewId)) {
        if (destViewId === 'welcomeView') {
            /*** https://craftpip.github.io/jquery-confirm/ ***/
            $.confirm({
                columnClass: 'col-xs-10 col-xs-offset-1',
                title: '',
                content: 'You are about to browse back to the registration page. You\'d be asked to re-enter your information if you wished to finish the quiz.',
                buttons: {
                    yes: {
                        text: 'PROCEED',
                        btnClass: 'btn-blue',
                        action: function () {
                            app.mobileApp.navigate('welcomeView?src=goback', transition);
                            PREV_VIEWS.pop(); /* remove the last item from array */
                        }
                    },
                    cancel: {}
                },
                animation: 'opacity',
                closeAnimation: 'opacity'
            });
        } else {
            app.mobileApp.navigate(destViewId + '?src=goback', transition);
            PREV_VIEWS.pop(); /* remove the last item from array */
        }
    }

}


function initViewEvents(e, dm) {

    var viewId = e.view.element[0].id;

    /* swipe right to go back functionality */
    var enableSwipe = (query2DimJsonObj(NAV_LIBRARY.items, 'viewId', viewId, 'enableSwipe') === false ? false : true);
    $("#" + viewId).kendoTouch({
        enableSwipe: enableSwipe,
        swipe: function (e) {
            if (e.direction === 'right') {
                goBack();
            }
        }
    });

    attachViewBtnEvents(dm, viewId);

}


function afterShowViewEvents(e) {

    var view = e.view;
    var viewId = e.view.element[0].id;

    /*select the menu item*/
    if (query2DimJsonObj(NAV_LIBRARY.items, 'viewId', viewId, 'menuAccess')) {
        selectMenuItem(viewId);
    }

}


function attachViewBtnEvents(dm, viewId) {

    var $submitBtnObj = $('#' + viewId + ' .submit-btn');
    var $processBtnObj = $('#' + viewId + ' .process-btn');

    if ($submitBtnObj.length) {
        bindTouchEvent($submitBtnObj, function (e) {
            //console.log('tap');console.log(e);
            bindSubmitBtnEvent(dm, viewId);
        });
    }

    if ($processBtnObj.length) {
        bindTouchEvent($processBtnObj, function (e) {
            //console.log('tap');console.log(e.touch.target);
            bindProcessBtnEvent(dm, viewId);
        });
    }

}
function bindSubmitBtnEvent(dm, viewId) {

    if (dm.isSubmitBtnEnabled) {
        dm.clickSubmitBtn(viewId);
    }

}
function bindProcessBtnEvent(dm, viewId) {

    if (dm.isProcessBtnEnabled) {
        dm.clickProcessBtn(viewId);
        /* enabling/disabling form elements are specified at data-model level */
    }

}
function bindTouchEvent($obj, proceed) {
    $obj.kendoTouch({
        tap: function (e) {
            //console.log(e.touch.target + " was tapped");
            proceed(e);
        }
    });
}


function hideTheView(hideHeader, hideFooter) {
    var viewId = getCurrentViewId();/* or send in view as jQuery object */
    var view = $('#' + viewId).data('kendoMobileView');
    if (hideHeader) { view.header.hide().css('opacity', '0'); }
    view.contentElement().hide().css('opacity', '0');
    if (hideFooter) { view.footer.hide().css('opacity', '0'); }
}
function showTheView(ms) {
    ms = (isObjValid(ms) ? ms : 0);
    var viewId = getCurrentViewId();/* or send in view as jQuery object */
    var view = $('#' + viewId).data('kendoMobileView');
    setTimeout(function () {
        if (view.header) { view.header.show().css('opacity', '1'); }
        view.contentElement().show().css('opacity', '1');
        if (view.footer) { view.footer.show().css('opacity', '1'); }
    }, ms);
}
function showAllViews() {
    var viewId, view;
    $.each(NAV_LIBRARY.items, function (rowIndex, rowObj) { /*** iterates thru each row ***/
        viewId = rowObj.viewId;
        view = $('#' + viewId).data('kendoMobileView');
        view.header.show().css('opacity', '1');
        view.contentElement().show().css('opacity', '1');
        view.footer.show().css('opacity', '1');
    });
}


function msg(title, content) {

    /*https://craftpip.github.io/jquery-confirm/*/
    $.alert({
        title: title,
        columnClass: 'col-xs-10 col-xs-offset-1',
        content: content,
        animation: 'opacity',
        closeAnimation: 'opacity'
    });

}


function answerFeedback(qIX, answer) {

    var audio;

    if (CORRECT_ANSWERS[qIX] === answer) {
        //audio = new Audio('sounds/correct.mp3');
        audio = document.getElementById('audioCorrect');
        $.toast({
            text: 'Correct :)',
            showHideTransition: 'fade',
            icon: 'success',
            position: 'mid-center',
            textAlign: 'center',
            textColor: '#fff',
            loaderBg: '#0072a7',
            allowToastClose: false,
            hideAfter: 1150
        });
    } else {
        //audio = new Audio('sounds/wrong.mp3');
        audio = document.getElementById('audioWrong');
        $.toast({
            text: 'Wrong :(',
            showHideTransition: 'fade',
            icon: 'error',
            position: 'mid-center',
            textAlign: 'center',
            textColor: '#fff',
            loaderBg: '#0072a7',
            allowToastClose: false,
            hideAfter: 1150
        });
    }

    audio.play();

}