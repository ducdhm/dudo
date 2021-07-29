export const getScrollbarWidth = (el) => {
    if (!el || el === document.body) {
        return window.innerWidth - document.documentElement.clientWidth;
    } else {
        return el.offsetWidth - el.clientWidth;
    }
};

export default getScrollbarWidth;
