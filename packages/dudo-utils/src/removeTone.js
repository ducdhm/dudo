module.exports = (str, isCaseSensitive = false) => {
    let formatted = isCaseSensitive ? str : str.toLowerCase();

    formatted = formatted.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    formatted = formatted.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    formatted = formatted.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    formatted = formatted.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    formatted = formatted.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    formatted = formatted.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    formatted = formatted.replace(/đ/g, 'd');

    if (isCaseSensitive) {
        formatted = formatted.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
        formatted = formatted.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
        formatted = formatted.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
        formatted = formatted.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
        formatted = formatted.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
        formatted = formatted.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
        formatted = formatted.replace(/Đ/g, 'D');
    }

    return formatted;
};
