import normalizeSpace from '../normalizeSpace'

it('normalizeSpace', () => {
  expect(normalizeSpace('        a            b              c ')).toEqual('a b c ')
  expect(normalizeSpace('a               b            c')).toEqual('a b c')
  expect(normalizeSpace('a               b            c        ')).toEqual('a b c ')
  expect(normalizeSpace('          a               b            c        ')).toEqual('a b c ')
})
