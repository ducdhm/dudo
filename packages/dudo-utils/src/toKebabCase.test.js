const toKebabCase = require('../src/toKebabCase');

it('toKebabCase', () => {
    expect(toKebabCase('PascalCase')).toEqual('pascal-case');
    expect(toKebabCase('camelCase')).toEqual('camel-case');
    expect(toKebabCase('hello world')).toEqual('hello-world');
    expect(toKebabCase('some-mixed_string With space_underscores-and-hyphens')).toEqual('some-mixed-string-with-space-underscores-and-hyphens');
});
