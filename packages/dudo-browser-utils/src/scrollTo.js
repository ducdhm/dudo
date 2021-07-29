import getOffset from './getOffset';
import easingList from '@dudojs/easing';

export const scrollTo = (element, duration = 200, offset = 0, easing = 'linear') => {
    let startingY = window.pageYOffset;
    let elementY = getOffset(element).top + offset;

    // If element is close to page's bottom then window will scroll only to some position above the element.
    let targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;
    let diff = targetY - startingY;

    let doEasing = easingList[easing];
    let start;

    if (!diff) {
        return;
    }

    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimationFrame(function step(timestamp) {
        if (!start) {
            start = timestamp;
        }

        // Elapsed milliseconds since start of scrolling.
        let time = timestamp - start;

        // Get percent of completion in range [0, 1].
        let percent = Math.min(time / duration, 1);

        // Apply the easing.
        // It can cause bad-looking slow frames in browser performance tool, so be careful.
        percent = doEasing(percent)

        window.scrollTo(0, startingY + diff * percent);

        // Proceed with animation as long as we wanted it to.
        if (time < duration) {
            window.requestAnimationFrame(step);
        }
    })
};

export default scrollTo;
