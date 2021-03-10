module.exports = (code, msg) => {
    let error = new Error(msg);
    error.code = code;

    return error;
};
