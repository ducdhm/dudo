import getUuid from '../getUuid';

it('getUuid', () => {
    expect(getUuid()).not.toEqual(getUuid());
    
    expect(/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-4[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/.test(getUuid())).toBeTruthy();
    expect(/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-4[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/.test(getUuid())).toBeTruthy();
    expect(/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-4[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/.test(getUuid())).toBeTruthy();
    expect(/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-4[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/.test(getUuid())).toBeTruthy();
    expect(/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-4[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/.test(getUuid())).toBeTruthy();
});
