

const { assert } = require('chai');

const bugId = "?bug_id=4";

describe('Добавление в корзину:', async () => {
    it('добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async function({browser}) {
        await browser.url("/hw/store/catalog/" + bugId);
    
        const catalogContainer = await browser.$(".Catalog > .row:nth-child(2)");
    
        const ProdItem = await catalogContainer.$('.ProductItem')
        const card_body = ProdItem.$(".card-body");
        
        const link = card_body.$(".card-link");
        await link.click()
        const prodBTN = browser.$('.ProductDetails-AddToCart')
        await prodBTN.click()
        await prodBTN.click()
        
        await browser.url("/hw/store/cart/" + bugId);
    
        const counter = await browser.$('.Cart-Count')
        await counter.waitForExist()
        const val = await counter.getText()
        
        assert(await val == '2' ? true: false, "Счетчик в корзине не обновляется")
    })
})
