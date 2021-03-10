module.exports = (obj, propName) => {
    let values = Object.values(obj);

    return propName ? values.map(value => value[propName]) : values;
};
