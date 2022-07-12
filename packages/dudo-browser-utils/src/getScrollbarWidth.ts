import getElement from './getElement';

export default function getScrollbarWidth (target: string | HTMLElement) {
    const element = getElement(target);
    
    if (!element || element === document.body) {
        return window.innerWidth - document.documentElement.clientWidth;
    } else {
        return element.offsetWidth - element.clientWidth;
    }
};
