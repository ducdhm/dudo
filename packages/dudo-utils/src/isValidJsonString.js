module.exports = (data) => {
    try {
        JSON.parse(data);
    } catch (e) {
        return false;
    }

    return true;
};
