import 'jquery.reload/dist/jquery.reload';

const doReload = (btn) => {
    let container = btn.closest('.reload-container');
    let message = btn.attr('data-message');
    let target = $(btn.attr('data-target'));
    let actionUrl = btn.attr('data-action-url');
    let reloadUrl = btn.attr('data-reload-url');
    let dataRequest = (new Function('return ' + btn.attr('data-request')))();

    btn.trigger('loading:loading');

    if (actionUrl) {
        $.ajax({
            url: actionUrl,
            dataType: 'json',
            type: 'post',
            data: dataRequest,
            success: function (resp) {
                if (resp && resp.status) {
                    container.add(target).reload({
                        url: reloadUrl,
                        onReloaded: function () {
                            message && Msg.success(message);
                            btn.trigger('loading:loaded');
                        },
                    });
                } else {
                    Msg.error(LOCALE.BTN_RELOAD__ERROR);
                }
            },
            error: function () {
                Msg.error(LOCALE.BTN_RELOAD__ERROR);
            },
            complete: function () {
                btn.trigger('loading:loaded');
            },
        });
    } else {
        container.add(target).reload({
            url: reloadUrl,
            onReloaded: function () {
                message && Msg.success(message);
                btn.trigger('loading:loaded');
            },
        });
    }
};

export default () => {
    $(document.body).on('click', '.btn-reload', function (e) {
        e.preventDefault();

        let btn = $(this);
        let confirmText = btn.attr('data-confirm');

        if (confirmText) {
            Msg.confirm(confirmText, () => {
                doReload(btn);
            });
        } else {
            doReload(btn);
        }
    });
};
