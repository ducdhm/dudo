export default function openPopup(url: string, title: string, width: number, height: number) {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
    
    const windowWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const windowHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    
    const systemZoom = windowWidth / window.screen.availWidth;
    const left = (windowWidth - width) / 2 / systemZoom + dualScreenLeft;
    const top = (windowHeight - height) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(url, title,
        `
            toolbar=no,
            location=no,
            directories=no,
            status=no,
            menubar=no,
            resizable=no,
            copyhistory=no,
            scrollbars=yes,
            width=${width / systemZoom},
            height=${height / systemZoom},
            top=${top},
            left=${left}
      `,
    );
    
    if (window.focus) newWindow.focus();
};
