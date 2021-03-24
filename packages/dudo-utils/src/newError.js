module.exports = (code = 500, msg = 'Internal Server Error') => {
    let error = new Error(msg);
    error.code = code;

    return error;
};
