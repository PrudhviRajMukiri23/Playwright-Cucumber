class HomePage {

    constructor() {
        this.url = "https://www.polestar.com/se"
        this.title = "Polestar – Elbilar | Polestar Sverige"
    }

    async getHomePageUrl() {
        return this.url
    }

    async getHomePageTitle() {
        return this.title
    }

}

exports.HomePage = HomePage