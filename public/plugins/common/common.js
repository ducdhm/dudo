function flog() {
    if (typeof (console) != 'undefined') {
        if (navigator.appName == 'Microsoft Internet Explorer') {
            if (arguments.length == 1) {
                console.log(arguments[0]);
            } else if (arguments.length == 2) {
                console.log(arguments[0], arguments[1]);
            } else if (arguments.length > 2) {
                console.log(arguments[0], arguments[1], arguments[2]);
            }
        } else {
            console.log(arguments);
        }
    }
}
