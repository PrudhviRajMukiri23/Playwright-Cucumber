const {Given, When, Then, After, Before, setDefaultTimeout, BeforeAll}=require('@cucumber/cucumber')
const {chromium, expect}=require('@playwright/test');
const cookieeActions = require('../modules/CookieeActions');
const { HomePage } = require('../pages/homepage');
const { TestDrive } = require('../pages/testdrive');

setDefaultTimeout(60*1000)
let page, browser

Before(async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

Given('I have navigated to {string} and handled the popup', async function (string) {
    await page.goto(string)
    await cookieeActions.cookieAccept(page)
});

Given('I am on the home page', async function () {
    const homePageInstance = new HomePage()
    expect(await page.url()).toEqual(await homePageInstance.getHomePageUrl())
    expect(await page.title()).toEqual(await homePageInstance.getHomePageTitle())
  });

When('I hover on {string} and click {string}', async function (string, string2) {
    const testdriveInstance = new TestDrive()
    await testdriveInstance.hoverAndClickCar(page, string, string2)
});

When('I should land on the test drive booking page with selected model as default selection', async function () {  
    const testdriveInstance = new TestDrive()
    await testdriveInstance.verifyDefaultModelSelection(page)
});

When('I searched the address with following {string} value', async function (string) {
    const testdriveInstance = new TestDrive()
    await testdriveInstance.selectPresentedAddress(page)
});

When('Select the preference of car by clicking {string}', async function (string) {
    const testdriveInstance = new TestDrive()
    await testdriveInstance.selectPreferenceOfCar(page, string)
});

When('Select the valid {string} from the calendar', async function (string) {
    const testdriveInstance = new TestDrive()
    await testdriveInstance.selectDateFromCalender(page, string)
});

When('Provide valid contact details with valid {string}, {string}, {string}, {string}, {string}', async function (string, string2, string3, string4, string5) {
    const testdriveInstance = new TestDrive()
    await testdriveInstance.fillValidContactdetails(page, string, string2, string3, string4, string5)
});

When('Select proper customer type', async function () {
    const testdriveInstance = new TestDrive()
    await testdriveInstance.selectCustomerType(page)
});

When('Check the checkboxes and click on {string} for confirming booking', async function (string) {
    const testdriveInstance = new TestDrive()
    await testdriveInstance.checkAndConfirmBooking(page, string)
});

Then('I should land on the Confirmed booking success page', async function () {
    const testdriveInstance = new TestDrive()
    await testdriveInstance.verifyBookingStatus(page)
});

After(async function () {
    await browser.close();
})
