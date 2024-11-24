const {Given, When, Then, After, Before, setDefaultTimeout}=require('@cucumber/cucumber')
const {chromium, expect}=require('@playwright/test');
const { HomePage } = require('../pages/homepage');

setDefaultTimeout(60*1000)
let page, browser, url

Before(async function () {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    page = await context.newPage();
});

Given('I have navigated to {string}', async function (string) {
    await page.goto(string)
});

When('I land on Homepage', async function () {
    url = await page.url()
});

Then('I should land on homepage with proper url and title', async function () {
    const homePage = new HomePage();
    const homePageUrl = await homePage.getHomePageUrl();
    await expect(url).toContain(homePageUrl)
});