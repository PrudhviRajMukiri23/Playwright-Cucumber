class CookieeActions {

    static instance

    constructor(){
        if(CookieeActions.instance) {
            return CookieeActions.instance
        }
        this.dialogAccept="//button[text()='Accept all']"
        CookieeActions.instance = this
    }

     async cookieAccept(page){
        await page.waitForTimeout(4000)
        await page.locator(this.dialogAccept).click()
        await page.waitForTimeout(2000)
    }

}

module.exports = new CookieeActions()