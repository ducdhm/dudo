const removeTone = require('../src/removeTone');
const testStr = 'Đoàn Hoàng Minh Đức';

it('removeTone', () => {
    expect(removeTone(testStr)).toEqual('doan hoang minh duc');
});

it('removeTone > isCaseSensitive=true', () => {
    expect(removeTone(testStr, true)).toEqual('Doan Hoang Minh Duc');
});
