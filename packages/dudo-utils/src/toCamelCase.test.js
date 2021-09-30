const toCamelCase = require('../src/toCamelCase');

it('toCamelCase', () => {
    expect(toCamelCase('PascalCase')).toEqual('pascalCase');
    expect(toCamelCase('kebab-case')).toEqual('kebabCase');
    expect(toCamelCase('hello world')).toEqual('helloWorld');
    expect(toCamelCase('some-mixed_string With space_underscores-and-hyphens')).toEqual('someMixedStringWithSpaceUnderscoresAndHyphens');
});
