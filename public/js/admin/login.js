$(function () {
  var form = $('form');
  form.forms({
    onSuccess: function (resp) {
      window.location.href = resp.data.returnTo;
    }
  });
});