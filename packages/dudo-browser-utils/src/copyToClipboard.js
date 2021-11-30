const fallbackCopyTextToClipboard = (text, onSuccess, onError) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        let isOk = document.execCommand('copy');
        if (isOk) {
            typeof onSuccess === 'function' && onSuccess();
        } else {
            typeof onError === 'function' && onError();
        }
    } catch (error) {
        typeof onError === 'function' && onError(error);
    }

    document.body.removeChild(textArea);
};

export const copyToClipboard = (text, onSuccess, onError) => {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text, onSuccess, onError);
        return;
    }

    navigator.clipboard.writeText(text).then(function () {
        typeof onSuccess === 'function' && onSuccess();
    }, function (error) {
        typeof onError === 'function' && onError(error);
    });
};

export default copyToClipboard;
