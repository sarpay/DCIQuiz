app.drawer = kendo.observable({

    showing: false,

    onBeforeShow: function (e) {
        //if (DRAWER_ENABLED) {

            /*** Disables the drawer for these views ***/
            /* no longer need this since swipe to open is to be disabled */
            //var viewsWithoutDrawers = [];
            //viewsWithoutDrawers.push('signUp-1.html', 'signIn.html');
            //viewsWithoutDrawers.push('offline.html');
            //var viewId = e.view.currentView.id;
            //for (var i = 0; i < viewsWithoutDrawers.length; i++) {
            //    if (viewId.indexOf(viewsWithoutDrawers[i]) >= 0) {
            //        e.preventDefault();
            //    }
            //}

        //} else {
        //    e.preventDefault();
        //}
    },

    onInit: function (e) {

    },

    onShow: function (e) {

        this.set('showing', true);

        /* dim out the main content area */
        /* grab the last div within the current view's parent div */
        var $view = $('#' + getCurrentViewId() + ' div').last();
        $view.css('transition', 'background .15s ease-in');
        setTimeout(function () {
            $view.css('background', 'rgba(0,0,0,0.4)');
        }, 450);

    },

    onAfterHide: function (e) {

        this.set('showing', false);

        /* remove dim from main content area */
        var $view = $('#' + getCurrentViewId() + ' div').last();
        $view.css('background', 'rgba(252,252,252,0)');

    }
});


$(function () {
    $('#navigation-container a').bind('touchend', function () {
        //Drawer hides automatically when the application navigates to another view.
        //toggleDrawer('close');

        var destPage = $(this).data('target');
        var qsParams = $(this).data('qsparams');

        var destUrl = query2DimJsonObj(NAV_LIBRARY.items, 'key', destPage, 'viewId');
        if (isObjValid(qsParams)) {
            if (qsParams.length > 0) {
                destUrl += '?' + qsParams;
            }
        }
        //if (destPage == 'signIn') {
        //    signMeOut(destUrl, 'ref=signOut', true);
        //} else {
        app.mobileApp.navigate(destUrl);/* can't use goToView since drawer transition is NOT native */
        //}

        return false;
    });
});


/*** highlight the selected drawer menu item ***/
app.selectStyleDrawerMenuItem = function ($item) {
    /*** clear styles from previous selection ***/
    $('#navigation-container li a.active').removeClass('active');
    $('#navigation-container li.km-active').removeClass('km-active');
    $('#navigation-container li.km-state-active').removeClass('km-state-active');
    /*** add styles to current selection ***/
    $item.addClass('active');
    $item.parent('li').addClass('km-active');
    $item.parent('li').addClass('km-state-active');
};


function selectMenuItem(viewId) {

    var $obj = $('#navigation-container a');
    var selectedViewKey = query2DimJsonObj(NAV_LIBRARY.items, 'viewId', viewId, 'key');

    var $aObj, viewKey, i;
    for (i = 0; i < $obj.length; i++) {
        $aObj = $($obj[i]);
        viewKey = $aObj[0].attributes['data-target'].value;
        if (viewKey === selectedViewKey) {
            app.selectStyleDrawerMenuItem($aObj);
            break;
        }
    }

}