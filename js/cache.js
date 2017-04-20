var appCache = window.applicationCache;

// Fired after the first cache of the manifest.
appCache.addEventListener(
    'cached',
    function (e) {
        $.toast().reset('all');
        msg('', 'App is now ready for offline use.');
    },
    false
);

// Checking for an update. Always the first event fired in the sequence.
appCache.addEventListener(
    'checking',
    function () {

    },
    false
);

// An update was found. The browser is fetching resources.
appCache.addEventListener(
    'downloading', 
    function (e) {
        /*http://kamranahmed.info/toast*/
        $.toast({
            heading: 'Please Wait...',
            text: 'Pages are being downloaded for offline use.',
            position: 'mid-center',
            stack: false,
            textAlign: 'center',
            textColor: '#fff',
            loaderBg: '#0072a7',
            allowToastClose: false,
            hideAfter: false
        });
    },
    false
);

// The manifest returns 404 or 410, the download failed,
// or the manifest changed while the download was in progress.
appCache.addEventListener(
    'error',
    function () {

    },
    false
);

// Fired after the first download of the manifest.
appCache.addEventListener(
    'noupdate',
    function () {

    },
    false
);

// Fired if the manifest file returns a 404 or 410.
// This results in the application cache being deleted.
appCache.addEventListener(
    'obsolete',
    function () {

    },
    false
);

// Fired for each resource listed in the manifest as it is being fetched.
appCache.addEventListener(
    'progress',
    function () {
        
    },
    false
);

// Fired when the manifest resources have been newly redownloaded.
appCache.addEventListener(
    'updateready',
    function () {
        $.toast().reset('all');
        msg('', 'App is now ready for offline use.');
    },
    false
);