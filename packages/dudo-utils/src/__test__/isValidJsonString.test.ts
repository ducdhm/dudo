import isValidJsonString from '../isValidJsonString'


it('isValidJsonString', () => {
  expect(
    isValidJsonString('{"name":"Duc Doan","email":"ducdhm@gmail.com"}'),
  ).toBeTruthy()

  expect(
    isValidJsonString('{name:"Duc Doan",email:"ducdhm@gmail.com"}'),
  ).toBeFalsy()
})
