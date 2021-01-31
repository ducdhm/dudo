import URI from 'urijs';

const initFilePicker = (target) => {
    let wrapper = target.parent('p');
    if (wrapper.length > 0) {
        wrapper.addClass('file-picker-wrapper');
    } else {
        target.wrap('<p class="file-picker-wrapper"></p>');
        wrapper = target.parent();
    }

    let isDisabled = target.prop('disabled');
    let picker = $(`
        <span class="input-group-append">
            <button type="button" class="btn btn-default" ${isDisabled ? 'disabled' : ''}>${ target.attr('data-button-text') || '' }</button>
        </span>
    `);
    picker.on('click', function (e) {
        e.preventDefault();

        const windowWidth = +target.attr('data-window-width') || 800;
        const windowHeight = +target.attr('data-window-height') || 600;
        const left = (screen.width / 2) - (windowWidth / 2);
        const top = (screen.height / 2) - (windowHeight / 2);
        const filePickerUrl = new URI(target.attr('data-url'));
        filePickerUrl.addSearch('iframe', 'true');

        window.FILE_PICKER_INPUT = target;
        window.FILE_PICKER_WINDOW = window.open(
            filePickerUrl.toString(),
            '',
            `width=${windowWidth}, height=${windowHeight}, top=${top}, left=${left}`
        );
    });

    wrapper.addClass('input-group');
    wrapper.append(picker);
};

export default () => {
    $('.file-picker').each(function () {
        initFilePicker($(this));
    });

    $(document.body).on('file-picker:none', '.file-picker', function () {
        initFilePicker($(this));
    });

    window.FILE_PICKER_SELECT_HANDLER = (url) => {
        if (window.FILE_PICKER_INPUT) {
            window.FILE_PICKER_INPUT.val(url).trigger('change');
        }

        if (window.FILE_PICKER_WINDOW) {
            window.FILE_PICKER_WINDOW.close();
        }

        window.FILE_PICKER_INPUT = null;
        window.FILE_PICKER_WINDOW = null;
    };
};
