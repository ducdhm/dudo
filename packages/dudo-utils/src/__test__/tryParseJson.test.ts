import tryParseJson from "../tryParseJson";

it('tryParseJson', () => {
    expect(tryParseJson('{"a":"b"}')).toEqual({ a: 'b' });
    expect(tryParseJson('[1,2,3]')).toEqual([1, 2, 3]);
    expect(tryParseJson('')).toEqual(null);
    expect(tryParseJson(1)).toEqual(1);
    expect(tryParseJson(false)).toEqual(false);
    expect(tryParseJson(0)).toEqual(0);
    expect(tryParseJson(null)).toEqual(null);
    expect(tryParseJson(undefined)).toEqual(null);
});
