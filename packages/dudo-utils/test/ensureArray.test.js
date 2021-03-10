const ensureArray = require('../src/ensureArray');

it('ensureArray', () => {
    expect(
        Array.isArray(ensureArray(['item1']))
    ).toBeTruthy();

    expect(
        Array.isArray(ensureArray())
    ).toBeTruthy();

    expect(
        Array.isArray(ensureArray(1))
    ).toBeTruthy();

    expect(
        Array.isArray(ensureArray('String'))
    ).toBeTruthy();

    expect(
        Array.isArray(ensureArray({ isObject: true }))
    ).toBeTruthy();
});
