const toSnakeCase = require('../src/toSnakeCase');

it('toSnakeCase', () => {
    expect(toSnakeCase('PascalCase')).toEqual('pascal_case');
    expect(toSnakeCase('camelCase')).toEqual('camel_case');
    expect(toSnakeCase('hello world')).toEqual('hello_world');
    expect(toSnakeCase('some-mixed_string With space_underscores-and-hyphens')).toEqual('some_mixed_string_with_space_underscores_and_hyphens');
});
