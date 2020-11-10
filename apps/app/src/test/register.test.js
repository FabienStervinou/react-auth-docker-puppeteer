const puppeteer = require('puppeteer');
const { delay } = require('./utils');
require('dotenv').config()

test('Should return an error for email length less than 6', async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://react-docker-pupeteer.com/register');

  await page.click('input#email');
  await page.type('input#email', 'abc')
  await page.click('input#password');
  await page.type('input#password', 'azertyuiop')
  await page.click('input#password_repeat');
  await page.type('input#password_repeat', 'azertyuiop')
  await page.click('input#register-submit')

  // DB request | response delay
  await delay(500)

  const errorMessageEmailLength = await page.$eval('#error', divs => divs.textContent);
  expect(errorMessageEmailLength).toBe('Email should have a minimum length of 6')
  await browser.close();
})

test('Should return an error for password length less than 6', async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://react-docker-pupeteer.com/register');

  await page.click('input#email');
  await page.type('input#email', 'test@test.com')
  await page.click('input#password');
  await page.type('input#password', 'aze')
  await page.click('input#password_repeat');
  await page.type('input#password_repeat', 'aze')
  await page.click('input#register-submit')

  // DB request | response delay
  await delay(500)

  const errorMessagePasswordLength = await page.$eval('#error', divs => divs.textContent);
  expect(errorMessagePasswordLength).toBe('Password should have a minimum length of 6')
  await browser.close();
})

test('Should return an error for password length upper than 1024', async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  await page.goto('http://react-docker-pupeteer.com/register');
  
  //Password with 1100 length
  const longPassword = process.env.STRING_LENGHT_1100.toString()
  
  await page.click('input#email');
  await page.type('input#email', 'test@test.com')
  await page.click('input#password');
  await page.type('input#password', longPassword)
  await page.click('input#password_repeat');
  await page.type('input#password_repeat', longPassword)
  await page.click('input#register-submit')

  // DB request | response delay
  await delay(500)

  const errorMessagePasswordToLong = await page.$eval('#error', divs => divs.textContent);
  expect(errorMessagePasswordToLong).toBe('Password should have a maximum length of 1024')
  await browser.close();
})

test('Should return an error for email length upper than 255', async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  await page.goto('http://react-docker-pupeteer.com/register');
  
  //Email lenght 260
  const longEmail = process.env.EMAIL_LENGHT_260.toString()
  
  await page.click('input#email');
  await page.type('input#email', longEmail)
  await page.click('input#password');
  await page.type('input#password', 'azertyuiop')
  await page.click('input#password_repeat');
  await page.type('input#password_repeat', 'azertyuiop')
  await page.click('input#register-submit')

  // DB request | response delay
  await delay(500)

  const errorMessagePasswordToLong = await page.$eval('#error', divs => divs.textContent);
  expect(errorMessagePasswordToLong).toBe('Email should have a maximum length of 255')
  await browser.close();
})

test('Should return an error an empty email field', async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  await page.goto('http://react-docker-pupeteer.com/register');
  
  await page.click('input#email');
  await page.type('input#email', "")
  await page.click('input#password');
  await page.type('input#password', 'azertyuiop')
  await page.click('input#password_repeat');
  await page.type('input#password_repeat', 'azertyuiop')
  await page.click('input#register-submit')

  // DB request | response delay
  await delay(500)

  const errorMessagePasswordToLong = await page.$eval('#error', divs => divs.textContent);
  expect(errorMessagePasswordToLong).toBe('Email cannot be an empty field')
  await browser.close();
})

test('Should return an error an empty password field', async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  await page.goto('http://react-docker-pupeteer.com/register');
  
  await page.click('input#email');
  await page.type('input#email', "test@test")
  await page.click('input#password');
  await page.type('input#password', '')
  await page.click('input#password_repeat');
  await page.type('input#password_repeat', 'azertyuiop')
  await page.click('input#register-submit')

  // DB request | response delay
  await delay(500)

  const errorMessagePasswordToLong = await page.$eval('#error', divs => divs.textContent);
  expect(errorMessagePasswordToLong).toBe('Password cannot be an empty field')
  await browser.close();
})
