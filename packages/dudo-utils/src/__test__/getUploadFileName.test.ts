import getUploadFileName from '../getUploadFileName';

it('getUploadFileName', () => {
    let uploadFile = 'meen.png';
    
    expect(/^meen___[a-zA-Z0-9-]{36}.png$/.test(getUploadFileName(uploadFile))).toBeTruthy();
    expect(getUploadFileName(uploadFile)).not.toEqual(getUploadFileName(uploadFile));
});
