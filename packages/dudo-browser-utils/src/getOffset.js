export const getOffset = (element) => {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }

    if (!element) {
        return {};
    }

    let top = 0;
    let left = 0;
    let width = element.clientWidth;
    let height = element.clientHeight;

    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);

    return {
        top,
        left,
        right: left + width,
        bottom: top + height,
        width,
        height,
    };
};

export default getOffset;
