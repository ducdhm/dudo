import formatNumber from '../formatNumber'

it('normalizeSpace', () => {
  expect(formatNumber(100000000, 4)).toEqual('100,000,000.0000')
  expect(formatNumber(100000000, 0)).toEqual('100,000,000')
  expect(formatNumber(100000000.333, 4)).toEqual('100,000,000.3330')
  expect(formatNumber(100000000.333, 3)).toEqual('100,000,000.333')
  expect(formatNumber(100000000.333, 2)).toEqual('100,000,000.33')
  expect(formatNumber(100000000.333, 0)).toEqual('100,000,000')
})

