module.exports = (str) => {
    return str &&
        str.charAt(0).toUpperCase()
        +
        str.substr(1).match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(x => x.toLowerCase())
            .join(' ');
};
