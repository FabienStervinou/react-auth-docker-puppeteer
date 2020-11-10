const { isEmail } = require('./validation')

test('Should return if email is valid', () => {
  const emailToShort = "test"
  expect(isEmail(emailToShort)).toBeFalsy()

  const emailSpecialCar = "test@/\/"
  expect(isEmail(emailSpecialCar)).toBeFalsy()

  const emailInvalid = "test@te"
  expect(isEmail(emailInvalid)).toBeFalsy()

  const emailValid = "test@test.com"
  expect(isEmail(emailValid)).toBeTruthy()
})