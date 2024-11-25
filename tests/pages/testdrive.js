class TestDrive {
    constructor() {

        this.modelName = ''
        this.firstAddress = "//div[@class='css-1nos8kb']/div/div[1]/button"
        this.customerListDropDown = "//input[@id='customer-category']/parent::div/div[2]"
        this.customerListResults = "#customer-category-list"
        this.legalCheckbox = "//input[@id='checkbox-legalDocumentsAccepted']"
        this.firstName = "//input[@id='firstname']"
        this.lastName = "//input[@id='lastname']"
        this.email = "//input[@id='email']"
        this.mobileNumber = "//input[@id='phone']"
        this.postalCode = "//input[@id='postal-code']"
        this.addressNextPage = "//button[@data-testId='next-page']"
        this.firstAddressValue = "(//button[@data-testId='selectable-date'])[1]"
    }

    async provideModelName() {
        return this.modelName
    }

    async hoverAndClickCar(page, model, testdrive) {
        this.modelName = model
        await page.locator(`//button/span/span[contains(text(), '${this.modelName}')]`).hover();
        let testDrive = `(//div[@class='css-19f9jwq']/div/div[@class='css-tyurac']/child::a[text()='${testdrive}'])[1]`
        await page.waitForSelector(testDrive)
        await page.locator(testDrive).click();
    }

    async verifyDefaultModelSelection(page) {
        switch(this.modelName){
            case 'Polestar 2':
                expect(page.url()).toContain('ps2')
                break
            case 'Polestar 3':
                expect(page.url()).toContain('ps3')
                break
            case 'Polestar 4':
                expect(page.url()).toContain('ps4')
        }
    }

    async selectPresentedAddress(page) {
        // await page.locator("//div[@id='location-search-container']/descendant::input").fill(string)
        // await page.waitForSelector("//div[@id='location-search-popover']/child::button");
        // await page.locator("//div[@id='location-search-popover']/child::button")
        
        // await page.keyboard.press('ArrowDown')
        // await page.keyboard.press('Enter')
        await page.locator(this.firstAddress).click()
    }

    async selectPreferenceOfCar(page, string) {
        await page.locator(`//span[text()='${string}']/preceding-sibling::div[2]`).click()
    }

    async selectDateFromCalender(page, string) {
        //let value = string.split('-')
                // selecting the given date first availability slot
        //    if(expect(await page.locator("(//button[@data-testId='selectable-date'])[1]")).toBeTruthy()){
        //     //await expect(await page.locator(`//div[@class='css-h1ftor eiequla0']/p[contains(text(),'${value[0]}')]/preceding-sibling::p[contains(text(), '${value[1]}')]`)).toBeVisible()
        //     await page.locator("(//button[@data-testId='selectable-date'])[1]").click()
        //    } else {
            await page.locator(this.addressNextPage).click();
            await page.locator(this.firstAddressValue).click()
        //    }
    }

    async fillValidContactdetails(page, string, string2, string3, string4, string5) {
        await page.locator(this.firstName).fill(string)
        await page.locator(this.lastName).fill(string2)
        await page.locator(this.email).fill(string3)
        await page.locator(this.mobileNumber).fill(string4)
        await page.locator(this.postalCode).fill(string5)
    }

    async selectCustomerType(page){
        await page.locator(this.customerListDropDown).click()
        await page.waitForSelector(tbis.customerListResults)
        await page.keyboard.press('Enter')
    }

    async checkAndConfirmBooking(page, string) {
        await page.locator(this.legalCheckbox).click();
        await page.locator(`//button[@data-testId='confirm-booking-btn']/span/span[text()='${string}']`).click()
    }

    async verifyBookingStatus(page) {
            // const newBooking=await page.locator("//*[contains(text(), 'Din Polestar-provkörning är nu bekräftad')]")
    // const alreadybooked=await page.locator("//*[contains(text(), 'Du är redan bokad för provkörning.')]")
    // console.log(await expect.soft(newBooking).toBeVisible(), " ", await expectsoft(alreadybooked).toBeVisible())
    const text1 = await page.locator("//section[@class='css-2itl8q']/div/child::h2").textContent();

    console.log(text1)
    }


}

exports.TestDrive = TestDrive