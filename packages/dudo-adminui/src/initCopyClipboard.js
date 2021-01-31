// Clipboard
// -----------------------------------------------
import ClipboardJS from 'clipboard/dist/clipboard.min';

const selector = '.btn-copy-clipboard';

const showTooltip = (btn, message) => {
    $(btn)
        .tooltip('hide')
        .attr('data-original-title', message)
        .tooltip('show');
};

const hideTooltip = (btn) => {
    setTimeout(function () {
        $(btn).tooltip('hide');
    }, 1000);
};

const initBtnCopyClipboard = () => {
    const clipboard = new ClipboardJS(selector);

    clipboard.on('success', function (e) {
        showTooltip(e.trigger, LOCALE.COPY_CLIPBOARD__COPIED);
        hideTooltip(e.trigger);
    });

    clipboard.on('error', function (e) {
        showTooltip(e.trigger, LOCALE.COPY_CLIPBOARD__FAILED);
        hideTooltip(e.trigger);
    });

    $(selector).tooltip({
        trigger: 'click',
        placement: 'bottom',
    });
};

export default () => {
    $(document.body).on('click', selector, (e) => e.preventDefault());

    initBtnCopyClipboard();

    $(document.body).on('copy-clipboard:none', selector, function () {
        initBtnCopyClipboard();
    });
};
