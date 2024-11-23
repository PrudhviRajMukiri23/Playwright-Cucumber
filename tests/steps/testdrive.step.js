const {Given, When, Then, After, Before, setDefaultTimeout}=require('@cucumber/cucumber')
const {chromium, expect}=require('@playwright/test')

setDefaultTimeout(60*1000)
let page, browser, modelName

Before(async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

Given('I have navigated to {string} and handled the popup', async function (string) {
    await page.goto(string)
    await page.waitForSelector("//button[text()='Accept all']")
    await page.locator("//button[text()='Accept all']").click()
});

Given('I am on the home page', async function () {
    await expect(await page.url()).toEqual("https://www.polestar.com/se")
    await expect(await page.title()).toEqual("Polestar – Elbilar | Polestar Sverige")
  });

When('I hover on {string} and click {string}', async function (string, string2) {
    let modelName = string
    await page.locator(`//button/span/span[contains(text(), '${modelName}')]`).hover();
    let testdrive = `(//div[@class='css-19f9jwq']/div/div[@class='css-tyurac']/child::a[text()='${string2}'])[1]`
    await page.waitForSelector(testdrive)
    await page.locator(testdrive).click();
});

When('I should land on the test drive booking page with selected model as default selection', async function () {  
    switch(modelName){
        case 'Polestar 2':
            expect(page.url()).toContain('ps2')
            break
        case 'Polestar 3':
            expect(page.url()).toContain('ps3')
            break
        case 'Polestar 4':
            expect(page.url()).toContain('ps4')
    }
});

When('I searched the address with following {string} value', async function (string) {
    await page.locator("//div[@id='location-search-container']/descendant::input").fill(string)
    await page.waitForSelector("//div[@id='location-search-popover']/child::button");
    await page.locator("//div[@id='location-search-popover']/child::button")
    
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.locator("//div[@class='css-1nos8kb']/div/div[1]/button").click()
});

When('Select the preference of car by clicking {string}', async function (string) {
    await page.locator(`//span[text()='${string}']/preceding-sibling::div[2]`).click()
});

When('Select the valid {string} from the calendar', async function (string) {
   let value = string.split('-')
   // selecting the given date first availability slot
   if(await expect(await page.locator("(//button[@data-testId='selectable-date'])[1]")).toBeVisible()){
    await expect(await page.locator(`//div[@class='css-h1ftor eiequla0']/p[contains(text(),'${value[0]}')]/preceding-sibling::p[contains(text(), '${value[1]}')]`)).toBeVisible()
    await page.locator("(//button[@data-testId='selectable-date'])[1]").click()
   } else {
    await page.locator("//button[@data-testId='next-page']").click();
    await page.locator("(//button[@data-testId='selectable-date'])[1]").click()
   }
});

When('Provide valid contact details with valid {string}, {string}, {string}, {string}, {string}', async function (string, string2, string3, string4, string5) {
    await page.locator(`//input[@id='firstname']`).fill(string)
    await page.locator(`//input[@id='lastname']`).fill(string2)
    await page.locator(`//input[@id='email']`).fill(string3)
    await page.locator(`//input[@id='phone']`).fill(string4)
    await page.locator(`//input[@id='postal-code']`).fill(string5)
});

When('Select proper customer type', async function () {
    await page.locator("//input[@id='customer-category']/parent::div/div[2]").click()
    await page.waitForSelector("#customer-category-list")
    await page.keyboard.press('Enter')
});

When('Check the checkboxes and click on {string} for confirming booking', async function (string) {
    await page.locator("//input[@id='checkbox-legalDocumentsAccepted']").click();
    await page.locator(`//button[@data-testId='confirm-booking-btn']/span/span[text()='${string}']`).click()
});

Then('I should land on the Confirmed booking success page', async function () {
    const newBooking=await page.locator("//*[contains(text(), 'Din Polestar-provkörning är nu bekräftad')]")
    const alreadybooked=await page.locator("//*[contains(text(), 'Du är redan bokad för provkörning.')]")
    console.log(await expect.soft(newBooking).toBeVisible(), " ", await expectsoft(alreadybooked).toBeVisible())
});


After(async function () {
    await browser.close();
})
