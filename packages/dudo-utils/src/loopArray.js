module.exports = async (array, maxItem, callback) => {
    if (!Array.isArray(array)) {
        return;
    }

    if (array.length === 0) {
        return;
    }

    if (typeof callback !== 'function') {
        return;
    }

    let totalLoop = Math.ceil(array.length / maxItem);
    for (let i = 0; i < totalLoop; i++) {
        let start = i * maxItem;
        let end = (i + 1) * maxItem;
        let data = array.slice(start, end);

        await callback(data, start, end - 1);
    }
};
