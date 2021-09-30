const newError = require('../src/newError');

it('newError', () => {
    const error404 = newError(404, 'Page Not Found');
    expect(error404.code).toEqual(404);
    expect(error404.message).toEqual('Page Not Found');

    const error500 = newError();
    expect(error500.code).toEqual(500);
    expect(error500.message).toEqual('Internal Server Error');
});
