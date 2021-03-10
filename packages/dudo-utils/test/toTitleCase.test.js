const toTitleCase = require('../src/toTitleCase');

it('toTitleCase', () => {
    expect(toTitleCase('camelCase')).toEqual('Camel Case');
    expect(toTitleCase('kebab-case')).toEqual('Kebab Case');
    expect(toTitleCase('snake_case')).toEqual('Snake Case');
    expect(toTitleCase('hello world')).toEqual('Hello World');
    expect(toTitleCase('some-mixed_string With space_underscores-and-hyphens')).toEqual('Some Mixed String With Space Underscores And Hyphens');
});
