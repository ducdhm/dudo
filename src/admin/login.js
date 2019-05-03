import './styles/login.scss';

$('.login-page').length > 0 && $('form').niceform({
    onAjaxSuccess: function (resp) {
        window.location.href = resp.data.returnTo;
    }
});
