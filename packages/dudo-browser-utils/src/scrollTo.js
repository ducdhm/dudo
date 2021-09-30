import getOffset from './getOffset';

// From: https://gist.github.com/gre/1650294
const easingList = {
    // no easingList, no acceleration
    linear: t => t,
    // accelerating from zero velocity
    easeInQuad: t => t*t,
    // decelerating to zero velocity
    easeOutQuad: t => t*(2-t),
    // acceleration until halfway, then deceleration
    easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
    // accelerating from zero velocity
    easeInCubic: t => t*t*t,
    // decelerating to zero velocity
    easeOutCubic: t => (--t)*t*t+1,
    // acceleration until halfway, then deceleration
    easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
    // accelerating from zero velocity
    easeInQuart: t => t*t*t*t,
    // decelerating to zero velocity
    easeOutQuart: t => 1-(--t)*t*t*t,
    // acceleration until halfway, then deceleration
    easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
    // accelerating from zero velocity
    easeInQuint: t => t*t*t*t*t,
    // decelerating to zero velocity
    easeOutQuint: t => 1+(--t)*t*t*t*t,
    // acceleration until halfway, then deceleration
    easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
};

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
