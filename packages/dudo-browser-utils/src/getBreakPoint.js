const DEFAULTS = [
    {
        name: 'xs',
        max: 576,
    },
    {
        name: 'sm',
        min: 576,
        max: 768,
    },
    {
        name: 'md',
        min: 768,
        max: 992,
    },
    {
        name: 'lg',
        min: 992,
        max: 1200,
    },
    {
        name: 'xl',
        min: 1200,
    },
];

export default function getBreakPoint(option = DEFAULTS) {
    const width = window.innerWidth;

    for (let opt of option) {
        // Has max only
        if (!opt.min && opt.max && width < opt.max) {
            return opt.name;
        }

        // Has min and max
        if (opt.min && opt.max && width >= opt.min && width < opt.max) {
            return opt.name;
        }

        // Has min only
        if (opt.min && !opt.max && width >= opt.min) {
            return opt.name;
        }
    }
};
