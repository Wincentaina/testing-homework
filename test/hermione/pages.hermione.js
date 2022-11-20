
const { assert } = require('chai');

const bugId = "?bug_id=4";

describe ('Страницы:', async () => {

    it("Главная страница статична", async function ({browser}) {
        await browser.setWindowSize(1366, 768)
        await browser.url('/hw/store/' + bugId);
        await browser.assertView('home', '.Application', {
            compositeImage: true
        })
    })

    it("Страница доставки статична", async function ({browser}) {
        await browser.setWindowSize(1366, 768)
        await browser.url('/hw/store/delivery' + bugId);
        await browser.assertView('delivery', '.Application', {
            compositeImage: true
        })
    })

    it("Страница контактов статична", async function ({browser}) {
        await browser.setWindowSize(1366, 768)
        await browser.url('/hw/store/contacts' + bugId);
        await browser.assertView('contacts', '.Application', {
            compositeImage: true
        })
    })
})

