const { assert } = require('chai');

describe('Основные требования:', async () => {

    it('название - ссылка на главную', async function({browser}) {
        await browser.url('/hw/store/catalog');

        const a = await browser.$('.Application');
        await a.waitForExist();

        const link = await browser.$('.Application-Brand')
        await link.click()
        const url = await browser.getUrl()

        assert(url.endsWith('/hw/store/'));

    });

    it('wide < 576px меню - гамбургер', async function({browser}) {
        await browser.url('/hw/store/');
        await browser.setWindowSize(575, 500);

        const a = await browser.$('.Application');
        await a.waitForExist();

        const toggler = await browser.$('.Application-Toggler')

        assert(await toggler.isDisplayed());

    });
    it('после выбора пункта из гамбургера, закрыается меню', async function({browser}) {
        await browser.url('/hw/store/');
        await browser.setWindowSize(575, 500);

        const a = await browser.$('.Application');
        await a.waitForExist();

        const toggler = await browser.$('.Application-Toggler');
        await toggler.click();
        const menu = await browser.$('.Application-Menu');
        const link = await browser.$('.nav-link')
        await link.click();

        assert(menu.isDisplayed());

    });
});