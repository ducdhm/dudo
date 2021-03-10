const xlsx = require('xlsx');

module.exports = (filePath, sheetName) => {
    let workbook = xlsx.readFile(filePath);

    if (typeof sheetName === 'number') {
        sheetName = workbook.SheetNames[sheetName];
    }

    return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1
    });
};
