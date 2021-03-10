const cleanFolder = require('../src/cleanFolder');
const makeDir = require('make-dir');
const fs = require('fs');
const FOLDER_PATH = '../temp/';
const FILE_PATH = '../temp/message.txt';
const IGNORE_FILE_PATH = '../temp/ignore.txt';

beforeEach(() => {
    makeDir(FOLDER_PATH);
    fs.writeFileSync(FILE_PATH, 'Test', 'utf8');
    fs.writeFileSync(IGNORE_FILE_PATH, 'Test', 'utf8');
});

afterEach(() => {
    try {
        fs.existsSync(FILE_PATH) && fs.unlinkSync(FILE_PATH);
        fs.existsSync(IGNORE_FILE_PATH) && fs.unlinkSync(IGNORE_FILE_PATH);
        fs.rmdirSync(FOLDER_PATH);
    } catch(e) {}
});

it('cleanFolder > Array: ignore', () => {
    cleanFolder('../temp', ['ignore.txt']);
    expect(fs.existsSync(FILE_PATH)).toBeFalsy();
    expect(fs.existsSync(IGNORE_FILE_PATH)).toBeTruthy();
});

it('cleanFolder > Function: ignore', () => {
    cleanFolder('../temp', (file, folder) => {
        return file.indexOf('ignore') !== -1;
    });
    expect(fs.existsSync(FILE_PATH)).toBeFalsy();
    expect(fs.existsSync(IGNORE_FILE_PATH)).toBeTruthy();
});
