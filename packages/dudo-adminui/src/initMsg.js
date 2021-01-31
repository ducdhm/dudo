export default () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });

    window.Msg = {
        info: (msg) => {
            Toast.fire({
                icon : 'info',
                title: msg,
            });
        },
        success: (msg) => {
            Toast.fire({
                icon : 'success',
                title: msg,
            });
        },
        warning: (msg) => {
            Toast.fire({
                icon : 'warning',
                title: msg,
            });
        },
        error: (msg) => {
            Toast.fire({
                icon : 'error',
                title: msg,
            });
        },
        question: (msg) => {
            Toast.fire({
                icon : 'question',
                title: msg,
            });
        },
        confirm: (msg, onOk) => {
            Swal.fire({
                position: 'top',
                title: LOCALE.MSG__CONFIRM_TITLE,
                text: LOCALE.MSG__CONFIRM_TEXT,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: msg,
                cancelButtonText: LOCALE.MSG__CONFIRM_CANCEL_TEXT,
            }).then(result => {
                if (result.value) {
                    typeof onOk === 'function' && onOk();
                }
            });
        }
    };
};
