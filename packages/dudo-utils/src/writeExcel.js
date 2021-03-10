const xlsx = require('xlsx');

module.exports = (sheetData, sheetName, type) => {
    const workbook = xlsx.utils.book_new();
    const sheet = xlsx.utils.aoa_to_sheet(sheetData);
    xlsx.utils.book_append_sheet(workbook, sheet, sheetName);

    return xlsx.write(workbook, {
        type,
    });
};
