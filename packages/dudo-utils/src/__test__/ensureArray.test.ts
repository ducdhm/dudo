import ensureArray from '../ensureArray'

it('ensureArray', () => {
  expect(
    Array.isArray(ensureArray(['item1'])),
  ).toBeTruthy()

  expect(
    Array.isArray(ensureArray(1)),
  ).toBeTruthy()

  expect(
    Array.isArray(ensureArray('String')),
  ).toBeTruthy()

  expect(
    Array.isArray(ensureArray({isObject: true})),
  ).toBeTruthy()
})
