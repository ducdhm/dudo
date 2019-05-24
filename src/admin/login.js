import './styles/login.scss';

$('form').niceform({
    onAjaxSuccess: function (resp) {
        window.location.href = resp.data.returnTo;
    }
});
