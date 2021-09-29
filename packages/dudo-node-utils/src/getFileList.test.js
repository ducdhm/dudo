const getFileList = require('../src/getFileList');
const makeDir = require('make-dir');
const fs = require('fs');
const path = require('path');
const FOLDER_PATH = path.join(__dirname, '../temp/getFileList/');
const SUB_FOLDER_PATH = path.join(__dirname, '../temp/getFileList/subFolder');
const FILE1_PATH = path.join(__dirname, '../temp/getFileList/file-01.txt');
const FILE2_PATH = path.join(__dirname, '../temp/getFileList/file-02.txt');
const FILE3_PATH = path.join(__dirname, '../temp/getFileList/subFolder/file-03.txt');

beforeEach(() => {
    makeDir.sync(FOLDER_PATH);
    makeDir.sync(SUB_FOLDER_PATH);
    fs.writeFileSync(FILE1_PATH, 'Test', 'utf8');
    fs.writeFileSync(FILE2_PATH, 'Test', 'utf8');
    fs.writeFileSync(FILE3_PATH, 'Test', 'utf8');
});

afterEach(() => {
    try {
        fs.existsSync(FILE1_PATH) && fs.unlinkSync(FILE1_PATH);
        fs.existsSync(FILE2_PATH) && fs.unlinkSync(FILE2_PATH);
        fs.existsSync(FILE3_PATH) && fs.unlinkSync(FILE3_PATH);
        fs.rmdirSync(SUB_FOLDER_PATH);
        fs.rmdirSync(FOLDER_PATH);
    } catch(e) {
        console.log(e);
    }
});

it('getFileList', () => {
    expect(getFileList(FOLDER_PATH)).toEqual([
        FILE1_PATH,
        FILE2_PATH,
        FILE3_PATH,
    ]);
});
