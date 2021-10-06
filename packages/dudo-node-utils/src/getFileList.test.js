const getFileList = require('../src/getFileList');
const makeDir = require('make-dir');
const fs = require('fs');
const path = require('path');
const FOLDER_PATH = path.join(__dirname, '../temp/getFileList/');
const FILE1_NAME = 'file-01.txt';
const FILE2_NAME = 'file-02.txt';
const FILE1_PATH = path.join(__dirname, '../temp/getFileList', FILE1_NAME);
const FILE2_PATH = path.join(__dirname, '../temp/getFileList', FILE2_NAME);

beforeEach(() => {
    makeDir.sync(FOLDER_PATH);
    fs.writeFileSync(FILE1_PATH, 'Test', 'utf8');
    fs.writeFileSync(FILE2_PATH, 'Test', 'utf8');
});

afterEach(() => {
    try {
        fs.existsSync(FILE1_PATH) && fs.unlinkSync(FILE1_PATH);
        fs.existsSync(FILE2_PATH) && fs.unlinkSync(FILE2_PATH);
        fs.rmdirSync(FOLDER_PATH);
    } catch(e) {
        console.log(e);
    }
});

it('getFileList', () => {
    expect(getFileList(FOLDER_PATH)).toEqual([
        FILE1_PATH,
        FILE2_PATH,
    ]);
});

it('getFileList nameOnly=true', () => {
    expect(getFileList(FOLDER_PATH, true)).toEqual([
        FILE1_NAME,
        FILE2_NAME,
    ]);
});
