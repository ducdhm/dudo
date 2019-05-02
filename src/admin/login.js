import './styles/login.scss';
import 'jquery.niceform';

$(function () {
    $('form').niceform({
        onAjaxSuccess: function (resp) {
            window.location.href = resp.data.returnTo;
        }
    });
});