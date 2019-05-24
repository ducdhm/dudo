/**
 *  Simple plugin to reload content for an element. Usage:
 *  $('#categories-container').reloadFragment();
 *
 *  Note that the element must have an ID!
 *  @version: 1.0.2
 */
(function ($) {
    /**
     * Configuration of jquery.reloadFragment
     * @param {String} [url=window.location.pathname] Url which will use for reloading element
     * @param {Function} whenComplete The method will be called when reloading is succeeded!. Arguments are 'newDom', 'resp', 'status' and 'xhr'. 'newDom' is jQuery object which contains HTML content of reloading request. 'resp' is response text from server. 'status' is status text. 'xhr' is jqXHR object
     */
    var DEFAULT = {
        url: window.location.href,
        whenComplete: null
    };

    var methods = {
        init: function (options) {
            var config = $.extend({
                ids: []
            }, DEFAULT, options);

            var targets = $(this);
            targets.each(function () {
                var target = $(this);
                var id = target.attr('id');

                if (id === null || id === '') {
                    //
                } else {
                    config.ids.push(id);
                }
            });

            if (!targets.hasClass('reloading-fragment')) {
                var ids = config.ids;
                var url = window.location.pathname;
                if (config.url) {
                    url = config.url;
                }

                targets.addClass('reloading-fragment');
                $.get(url, {}, function (resp, status, xhr) {
                    targets.removeClass('reloading-fragment');

                    var newDom = $('<div />').html(resp);

                    for (var i = 0; i < ids.length; i++) {
                        var id = '#' + ids[i];
                        var target = $(id);

                        target.html(
                            newDom.find(id).html()
                        );
                    }

                    if (typeof config.whenComplete === 'function') {
                        config.whenComplete.call(target, newDom, resp, status, xhr);
                    }

                    target.trigger("reloaded", newDom, resp, status, xhr);
                });
            }

            return targets;
        }
    };

    $.fn.reloadFragment = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('[jquery.reloadFragment] Method ' + method + ' does not exist on jQuery.subscribe');
        }
    };

    // Version for jquery.reloadFragment
    $.fn.reloadFragment.version = '1.0.2';

})(jQuery);