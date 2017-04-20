
/*** DATA BINDINGS ***/

kendo.data.binders.widget.buttonText = kendo.data.Binder.extend({
    init: function (widget, bindings, options) {
        //call the base constructor
        kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
    },
    refresh: function () {
        var that = this,
            value = that.bindings["buttonText"].get(); //get the value from the View-Model
        $(that.element).text(value);
    }
});

kendo.data.binders.widget.htmlExt = kendo.data.Binder.extend({
    init: function (widget, bindings, options) {
        //call the base constructor
        kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
    },
    refresh: function () {
        var that = this,
            value = that.bindings["htmlExt"].get(); //get the value from the View-Model
        $(that.element).html(value);
    }
});