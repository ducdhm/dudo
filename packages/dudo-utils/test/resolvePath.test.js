const resolvePath = require('../src/resolvePath');
const makeDir = require('make-dir');
const path = require('path');
const fs = require('fs');
const FOLDER_PATH = '../temp/';
const SUB_FOLDER_PATH = '../temp/subFolder/';
const SUB_SUB_FOLDER_PATH = '../temp/subFolder/subSubFolder/';
const SUB_SUB_SUB_FOLDER_PATH = '../temp/subFolder/subSubFolder/subSubSubFolder/';

beforeEach(() => {
    makeDir(FOLDER_PATH);
    makeDir(SUB_FOLDER_PATH);
    makeDir(SUB_SUB_FOLDER_PATH);
    makeDir(SUB_SUB_SUB_FOLDER_PATH);
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
        resolvePath('temp', 'subFolder')
    ).toEqual(
        path.join(__dirname, '..', 'temp', 'subFolder')
    );

    expect(
        resolvePath('temp', 'subFolder', 'subSubFolder')
    ).toEqual(
        path.join(__dirname, '..', 'temp', 'subFolder', 'subSubFolder')
    );

    expect(
        resolvePath('temp', 'subFolder', 'subSubFolder', 'subSubSubFolder')
    ).toEqual(
        path.join(__dirname, '..', 'temp', 'subFolder', 'subSubFolder', 'subSubSubFolder')
    );
});
