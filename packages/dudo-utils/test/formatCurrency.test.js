const formatCurrency = require('../src/formatCurrency');

it('normalizeSpace', () => {
    expect(formatCurrency()).toEqual('0');
    expect(formatCurrency(100000000.333, 4)).toEqual('100,000,000.3330');
    expect(formatCurrency(100000000.333, 3)).toEqual('100,000,000.333');
    expect(formatCurrency(100000000.333, 2)).toEqual('100,000,000.33');
    expect(formatCurrency(100000000.333, 0)).toEqual('100,000,000');
});

