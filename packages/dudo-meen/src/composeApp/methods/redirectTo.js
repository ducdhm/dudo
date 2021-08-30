module.exports = (app, url, ignoreQueryList = []) => (req, res, next) => {
    let queryPair = [];
    for (let name in req.query) {
        if (!ignoreQueryList.includes(name) && req.query.hasOwnProperty(name)) {
            queryPair.push(`${name}=${req.query[name]}`);
        }
    }
    let queryString = queryPair.join('&');

    res.redirect(301, `${url}${queryString ? '?' + queryString : ''}`);
};
