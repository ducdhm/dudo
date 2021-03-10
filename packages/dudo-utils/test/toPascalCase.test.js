const toPascalCase = require('../src/toPascalCase');

it('toPascalCase', () => {
    expect(toPascalCase('camelCase')).toEqual('CamelCase');
    expect(toPascalCase('kebab-case')).toEqual('KebabCase');
    expect(toPascalCase('snake_case')).toEqual('SnakeCase');
    expect(toPascalCase('hello world')).toEqual('HelloWorld');
    expect(toPascalCase('some-mixed_string With space_underscores-and-hyphens')).toEqual('SomeMixedStringWithSpaceUnderscoresAndHyphens');
});
