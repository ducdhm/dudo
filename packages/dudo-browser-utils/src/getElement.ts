export default function (target: string | HTMLElement): HTMLElement {
    if (typeof target === 'string') {
        return document.querySelector(target);
    }
    
    return target;
};
