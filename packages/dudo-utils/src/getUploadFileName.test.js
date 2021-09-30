const getUploadFileName = require('../src/getUploadFileName');

it('getUploadFileName', () => {
    let uploadFile = 'meen.png';

    expect(/^meen___\d+\.png$/.test(getUploadFileName(uploadFile))).toBeTruthy();
    expect(getUploadFileName(uploadFile)).not.toEqual(getUploadFileName(uploadFile));
});
