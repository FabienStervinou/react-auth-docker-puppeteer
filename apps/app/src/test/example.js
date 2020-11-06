const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Login test
  await page.goto('http://react-docker-pupeteer.com/login');

  await page.click('input#email');
  await page.type('input#email', 'abc')

  await page.click('input#password');
  await page.type('input#password', 'azertyuiop')

  await page.click('input#login-submit')

  errorEmailLenght = await page.$eval(
    'div#error',
    (div) => div.id
  )
  expect(errorEmailLenght).toBe('error')

  await browser.close();
})();