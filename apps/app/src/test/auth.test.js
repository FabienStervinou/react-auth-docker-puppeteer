const puppeteer = require('puppeteer');
const { delay } = require('./utils');

test('Should return an error for email length less than 6', async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  await page.goto('http://react-docker-pupeteer.com/register');
  
  // Generate a random email
  const randomNumber = Math.floor(Math.random() * Math.floor(999));
  const email = "test@test" + randomNumber + ".com"

  // Expect to create a new user
  await page.click('input#email');
  await page.type('input#email', email)
  await page.click('input#password');
  await page.type('input#password', 'azertyuiop')
  await page.click('input#password_repeat')
  await page.type('input#password_repeat', 'azertyuiop')
  await page.click('input#register-submit')

  // DB request | response delay
  await delay(500)

  // Expect to be redirect on login page 
  let urlLogin = page.url();
  expect(urlLogin).toBe(`http://react-docker-pupeteer.com/login`);

  // Expect logged the user
  await page.click('input#email');
  await page.type('input#email', email)
  await page.click('input#password');
  await page.type('input#password', 'azertyuiop')
  await page.click('input#login-submit')

  await delay(500)

  // Expect to be redirect on profile page 
  let urlProfile = page.url();
  expect(urlProfile).toBe(`http://react-docker-pupeteer.com/profile`);

  //TODO SUCCESS ALERT ON PROFILE 

  await browser.close();
})