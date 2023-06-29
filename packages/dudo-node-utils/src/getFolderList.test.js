const getFolderList = require('../src/getFolderList')
const makeDir = require('make-dir')
const fs = require('fs')
const path = require('path')
const FOLDER_PATH = path.join(__dirname, '../temp/getFolderList')
const SUB_FOLDER1_NAME = 'subFolder1'
const SUB_FOLDER2_NAME = 'subFolder2'
const SUB_FOLDER3_NAME = 'subFolder3'
const SUB_FOLDER1_PATH = path.join(__dirname, '../temp/getFolderList', SUB_FOLDER1_NAME)
const SUB_FOLDER2_PATH = path.join(__dirname, '../temp/getFolderList', SUB_FOLDER2_NAME)
const SUB_FOLDER3_PATH = path.join(__dirname, '../temp/getFolderList', SUB_FOLDER3_NAME)

beforeEach(() => {
  makeDir.sync(FOLDER_PATH)
  makeDir.sync(SUB_FOLDER1_PATH)
  makeDir.sync(SUB_FOLDER2_PATH)
  makeDir.sync(SUB_FOLDER3_PATH)
})

afterEach(() => {
  try {
    fs.rmdirSync(SUB_FOLDER1_PATH)
    fs.rmdirSync(SUB_FOLDER2_PATH)
    fs.rmdirSync(SUB_FOLDER3_PATH)
    fs.rmdirSync(FOLDER_PATH)
  } catch (e) {
  }
})

it('getFolderList', () => {
  expect(getFolderList(FOLDER_PATH)).toEqual([
    SUB_FOLDER1_PATH,
    SUB_FOLDER2_PATH,
    SUB_FOLDER3_PATH,
  ])
})

it('getFolderList nameOnly=true', () => {
  expect(getFolderList(FOLDER_PATH, true)).toEqual([
    SUB_FOLDER1_NAME,
    SUB_FOLDER2_NAME,
    SUB_FOLDER3_NAME,
  ])
})
