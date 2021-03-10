const getObjectValues = require('../src/getObjectValues');

it('getObjectValues', () => {
    expect(
        getObjectValues({
            name: 'Duc Doan',
            email: 'ducdhm@gmail.com',
        }),
    ).toEqual(['Duc Doan', 'ducdhm@gmail.com']);
});

it('getObjectValues with propName', () => {
    expect(
        getObjectValues({
            first: {
                value: 0,
                title: 'First',
            },
            second: {
                value: 1,
                title: 'Second',
            },
        }, 'value'),
    ).toEqual([0, 1]);

    expect(
        getObjectValues({
            first: {
                value: 0,
                title: 'First',
            },
            second: {
                value: 1,
                title: 'Second',
            },
        }, 'title'),
    ).toEqual(['First', 'Second']);
});
