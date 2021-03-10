module.exports = (str) => {
    return str &&
        str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map((x, i) => x.charAt(0)[i === 0 ? 'toLowerCase' : 'toUpperCase']() + x.substr(1).toLowerCase())
            .join('');
};
