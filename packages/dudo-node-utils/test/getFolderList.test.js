const getFolderList = require('../src/getFolderList');
const makeDir = require('make-dir');
const fs = require('fs');
const FOLDER_PATH = '../temp/';
const SUB_FOLDER1_PATH = '../temp/subFolder1/';
const SUB_FOLDER2_PATH = '../temp/subFolder2/';
const SUB_FOLDER3_PATH = '../temp/subFolder3/';

beforeEach(() => {
    makeDir(FOLDER_PATH);
    makeDir(SUB_FOLDER1_PATH);
    makeDir(SUB_FOLDER2_PATH);
    makeDir(SUB_FOLDER3_PATH);
});

afterEach(() => {
    try {
        fs.rmdirSync(SUB_FOLDER1_PATH);
        fs.rmdirSync(SUB_FOLDER2_PATH);
        fs.rmdirSync(SUB_FOLDER3_PATH);
        fs.rmdirSync(FOLDER_PATH);
    } catch(e) {}
});

it('getFolderList', () => {
    // Replace `\` to `/` when testing on Windows
    const folderList = getFolderList(FOLDER_PATH).map(item => item.replace(/[\\]/g, '/'));

    expect(folderList).toEqual([
        '../temp/subFolder1',
        '../temp/subFolder2',
        '../temp/subFolder3',
    ]);
});
