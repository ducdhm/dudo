const resolvePath = require('../src/resolvePath');
const makeDir = require('make-dir');
const path = require('path');
const fs = require('fs');
const FOLDER_PATH = path.join(__dirname, '../temp/resolvePath/');
const SUB_FOLDER_PATH = path.join(__dirname, '../temp/resolvePath/subFolder/');
const SUB_SUB_FOLDER_PATH = path.join(__dirname, '../temp/resolvePath/subFolder/subSubFolder/');
const SUB_SUB_SUB_FOLDER_PATH = path.join(__dirname, '../temp/resolvePath/subFolder/subSubFolder/subSubSubFolder/');

beforeEach(() => {
    makeDir.sync(FOLDER_PATH);
    makeDir.sync(SUB_FOLDER_PATH);
    makeDir.sync(SUB_SUB_FOLDER_PATH);
    makeDir.sync(SUB_SUB_SUB_FOLDER_PATH);
});

afterEach(() => {
    try {
        fs.rmdirSync(SUB_SUB_SUB_FOLDER_PATH);
        fs.rmdirSync(SUB_SUB_FOLDER_PATH);
        fs.rmdirSync(SUB_FOLDER_PATH);
        fs.rmdirSync(FOLDER_PATH);
    } catch(e) {}
});

it('resolvePath', () => {
    expect(
        resolvePath('temp', 'resolvePath', 'subFolder')
    ).toEqual(
        path.join(__dirname, '..', 'temp', 'resolvePath', 'subFolder')
    );

    expect(
        resolvePath('temp', 'resolvePath', 'subFolder', 'subSubFolder')
    ).toEqual(
        path.join(__dirname, '..', 'temp', 'resolvePath', 'subFolder', 'subSubFolder')
    );

    expect(
        resolvePath('temp', 'resolvePath', 'subFolder', 'subSubFolder', 'subSubSubFolder')
    ).toEqual(
        path.join(__dirname, '..', 'temp', 'resolvePath', 'subFolder', 'subSubFolder', 'subSubSubFolder')
    );
});
