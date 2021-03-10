const getExcelSheetData = require('../src/getExcelSheetData');
const xlsx = require('xlsx');
const makeDir = require('make-dir');
const fs = require('fs');
const FOLDER_PATH = '../temp/';
const FILE_PATH = '../temp/test.xls';
const SHEET_NAME = 'Sheet Test';
const SHEET_DATA = [
    [
        'No',
        'Name',
        'Email',
    ],
    [
        '1',
        'Duc',
        'ducdhm@gmail.com',
    ],
    [
        '2',
        'Dudo',
        'dudo@gmail.com',
    ],
];

beforeEach(() => {
    makeDir(FOLDER_PATH);
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet(SHEET_DATA);
    xlsx.utils.book_append_sheet(wb, ws, SHEET_NAME);
    xlsx.writeFile(wb, FILE_PATH);
});

afterEach(() => {
    try {
        fs.existsSync(FILE_PATH) && fs.unlinkSync(FILE_PATH);
        fs.rmdirSync(FOLDER_PATH);
    } catch(e) {}
});

it('getExcelSheetData', () => {
    const sheetData = getExcelSheetData(FILE_PATH, SHEET_NAME);
    expect(sheetData).toEqual(SHEET_DATA);
});
