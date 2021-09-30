const toSentenceCase = require('../src/toSentenceCase');

it('toSentenceCase', () => {
    expect(toSentenceCase('camelCase')).toEqual('Camel case');
    expect(toSentenceCase('kebab-case')).toEqual('Kebab case');
    expect(toSentenceCase('snake_case')).toEqual('Snake case');
    expect(toSentenceCase('hello world')).toEqual('Hello world');
    expect(toSentenceCase('some-mixed_string With space_underscores-and-hyphens')).toEqual('Some mixed string with space underscores and hyphens');
});
