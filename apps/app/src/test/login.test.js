const puppeteer = require('puppeteer');
const { delay } = require('./utils');

test('Should return an error for email length less than 6', async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    args: ['--no-sandbox']
  });
  // const browser = await puppeteer.connect({
  //   browserWSEndpoint: "ws://127.0.0.1:3000",
  //   ignoreHTTPSErrors: true
  // });
  const page = await browser.newPage();
  await page.goto('http://react-docker-pupeteer.com/login');

  // SHORT EMAIL
  await page.click('input#email');
  await page.type('input#email', 'abc')
  await page.click('input#password');
  await page.type('input#password', 'azertyuiop')
  await page.click('input#login-submit')

  // DB request | response delay
  await delay(500)

  // Verify DB response 
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
  await page.goto('http://react-docker-pupeteer.com/login');

  // // INVALID EMAIL
  await page.click('input#email');
  await page.type('input#email', 'test@test.com')
  await page.click('input#password');
  await page.type('input#password', 'aze')
  await page.click('input#login-submit')

  await delay(500)

  const errorMessagePassworLenght = await page.$eval('#error', divs => divs.textContent);
  expect(errorMessagePassworLenght).toBe('Password should have a minimum length of 6')
  
  await browser.close();
})

test('Should return an error for an invalid email', async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://react-docker-pupeteer.com/login');

  // // INVALID EMAIL
  await page.click('input#email');
  await page.type('input#email', 'test@test')
  await page.click('input#password');
  await page.type('input#password', 'azertyuiop')
  await page.click('input#login-submit')

  await delay(500)

  const errorMessageInvalidEmail = await page.$eval('#error', divs => divs.textContent);
  expect(errorMessageInvalidEmail).toBe('Email is not valid')
  
  await browser.close();
})

test('Should return an error for an empty email', async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://react-docker-pupeteer.com/login');

  // // INVALID EMAIL
  await page.click('input#email');
  await page.type('input#email', '')
  await page.click('input#password');
  await page.type('input#password', 'azertyuiop')
  await page.click('input#login-submit')

  await delay(500)

  const errorMessageInvalidEmail = await page.$eval('#error', divs => divs.textContent);
  expect(errorMessageInvalidEmail).toBe('Email cannot be an empty field')
  
  await browser.close();
})

test('Should return an error for an empty password', async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://react-docker-pupeteer.com/login');

  // // INVALID EMAIL
  await page.click('input#email');
  await page.type('input#email', 'test@test.com')
  await page.click('input#password');
  await page.type('input#password', '')
  await page.click('input#login-submit')

  await delay(500)

  const errorMessageInvalidEmail = await page.$eval('#error', divs => divs.textContent);
  expect(errorMessageInvalidEmail).toBe('Password cannot be an empty field')
  
  await browser.close();
})
