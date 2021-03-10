module.exports = (value) => {
    if (!Array.isArray(value)) {
        return value ? [value] : [];
    }
    
    return value;
};
