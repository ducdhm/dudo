import getOffset from './getOffset';

export const scrollTo = (element, offset = 0) => {
    let elementY = getOffset(element).top + offset;

    window.scrollTo({ top: elementY, behavior: 'smooth' });
};

export default scrollTo;
