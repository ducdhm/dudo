export default () => {
    $(document.body).on('click', '.chk-all', function () {
        let chkAll = $(this);
        let container = chkAll.attr('data-container');
        container = container ? $(container) : chkAll.closest('table');

        container.find('[type="checkbox"]').prop('checked', this.checked);
    });
};
