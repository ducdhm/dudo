export const scrollIntoView = (el, options) => {
    if (typeof el === 'string') {
        el = document.querySelector(el);
    }

    el.scrollIntoView(options || { behavior: 'smooth', block: 'start' });
};

export default scrollIntoView;
