const xlsx = require('xlsx');

module.exports = (sheetData, sheetName, filePath) => {
    const workbook = xlsx.utils.book_new();
    const sheet = xlsx.utils.aoa_to_sheet(sheetData);
    xlsx.utils.book_append_sheet(workbook, sheet, sheetName);

    xlsx.writeFileSync(workbook, filePath);
};
