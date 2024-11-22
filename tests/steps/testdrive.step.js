const {Given, When, Then, After, Before, setDefaultTimeout}=require('@cucumber/cucumber')
const {chromium, expect}=require('@playwright/test')

setDefaultTimeout(60*1000)
let page, browser, modelName

Before(async function () {
    browser = await chromium.launch({ headless: true });
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

// When('I hover on {string} and click {string}', async function (string, string2) {
//     let modelName = string
//     await page.locator(`//button/span/span[contains(text(), '${modelName}')]`).hover();
//     let testdrive = `(//div[@class='css-19f9jwq']/div/div[@class='css-tyurac']/child::a[text()='${string2}'])[1]`
//     await page.waitForSelector(testdrive)
//     await page.locator(testdrive).click();
// });

// Then('I should land on test drive booking page with selected model as default selection', async function () {  
//     switch(modelName){
//         case 'Polestar 2':
//             expect(page.url()).toContain('ps2')
//             break
//         case 'Polestar 3':
//             expect(page.url()).toContain('ps3')
//             break
//         case 'Polestar 4':
//             expect(page.url()).toContain('ps4')
//     }
// });

After(async function () {
    await browser.close();
})
