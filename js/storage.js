var STORAGE_LIBRARY = {};

STORAGE_LIBRARY.items = [];
STORAGE_LIBRARY.items.push({ key: 'pdf_data', storeType: 'session' });

STORAGE_LIBRARY.objects = [];
STORAGE_LIBRARY.objects.push({ key: 'doc', storeType: 'session' });


function setStorageItem(id, value) {

    if (isObjValid(value)) {
        var storeType = query2DimJsonObj(STORAGE_LIBRARY.items, 'key', id, 'storeType');
        if (typeof (Storage) !== 'undefined') {
            if (window[storeType + 'Storage']) {
                var storage = window[storeType + 'Storage'];
                storage.setItem(id, value);
            }
        }
    }

}
function getStorageItem(id) {

    var storeType = query2DimJsonObj(STORAGE_LIBRARY.items, 'key', id, 'storeType');
    var item;

    if (typeof (Storage) !== 'undefined') {
        if (window[storeType + 'Storage']) {
            var storage = window[storeType + 'Storage'];
            item = storage.getItem(id);
        }
    }

    return item;

}

function setStorageObj(id, obj) {

    if (isObjValid(obj)) {
        var storeType = query2DimJsonObj(STORAGE_LIBRARY.objects, 'key', id, 'storeType');
        var storage = window[storeType + 'Storage'];
        storage.setItem(id, JSON.stringify(obj));
    }

}
function getStorageObj(id) {

    var storeType = query2DimJsonObj(STORAGE_LIBRARY.objects, 'key', id, 'storeType');
    var obj;

    if (typeof (Storage) !== 'undefined') {
        if (window[storeType + 'Storage']) {
            var storage = window[storeType + 'Storage'];
            obj = storage.getItem(id);
        }
    }

    return JSON.parse(obj);

}

function removeStorageItem(id) {

    var storeType = query2DimJsonObj(STORAGE_LIBRARY.items, 'key', id, 'storeType');
    if (typeof (Storage) !== 'undefined') {
        if (window[storeType + 'Storage']) {
            var storage = window[storeType + 'Storage'];
            storage.removeItem(STORAGE_KEY_PREFIX + id);
        }
    }

}

function removeStorageObj(id) {

    var storeType = query2DimJsonObj(STORAGE_LIBRARY.objects, 'key', id, 'storeType');

    if (typeof (Storage) !== 'undefined') {
        if (window[storeType + 'Storage']) {
            var storage = window[storeType + 'Storage'];
            storage.removeItem(STORAGE_KEY_PREFIX + id);
        }
    }

}

function clearAllLocalStorage(callback) {

    window.localStorage.clear();
    callback();

}

function clearAllSessionStorage(callback) {

    window.sessionStorage.clear();
    callback();

}

function clearAllStorage(callback) {

    window.localStorage.clear();
    window.sessionStorage.clear();
    callback();

}