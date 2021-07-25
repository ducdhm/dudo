export default function getScrollbarWidth(el) {
    if (!el || el === document.body) {
        return window.innerWidth - document.documentElement.clientWidth;
    } else {
        return el.offsetWidth - el.clientWidth;
    }
};
