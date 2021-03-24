const getFileList = require('../src/getFileList');
const makeDir = require('make-dir');
const fs = require('fs');
const FOLDER_PATH = '../temp/';
const SUB_FOLDER_PATH = '../temp/subFolder';
const FILE1_PATH = '../temp/file-01.txt';
const FILE2_PATH = '../temp/file-02.txt';
const FILE3_PATH = '../temp/subFolder/file-03.txt';

beforeEach(() => {
    makeDir(FOLDER_PATH);
    makeDir(SUB_FOLDER_PATH);
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
    // Replace `\` to `/` when testing on Windows
    const fileList = getFileList(FOLDER_PATH).map(item => item.replace(/[\\]/g, '/'));

    expect(fileList).toEqual([
        '../temp/file-01.txt',
        '../temp/file-02.txt',
        '../temp/subFolder/file-03.txt',
    ]);
});
