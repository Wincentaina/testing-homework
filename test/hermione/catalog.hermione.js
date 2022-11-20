
const { assert } = require('chai');

const bugId = "?bug_id=4";

describe('Каталог:', async () => {
    it ('отображается название, цена и ссылка на страницу', async function({browser}) {

        await browser.url("/hw/store/catalog" + bugId);

        const catalogContainer = await browser.$(".Catalog > .row:nth-child(2)");

        for (let i = 1; i <= 25; i++) {
            const item = await catalogContainer.$(`div:nth-child(${i})`)
            await item.waitForExist()

            const ProdItem = await catalogContainer.$('.ProductItem')

            const card_body = ProdItem.$(".card-body");
            
            const name = card_body.$(".ProductItem-Price");
            const price = card_body.$(".ProductItem-Name");
            const link = card_body.$(".card-link");

            assert(await name.isExisting(), "название товара не отображается");
            assert(await price.isExisting(), "цена не отображается");
            assert(await link.isExisting(), "ссылка не отображается");
            
        }
    })

    it('отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', async function({browser}) {
        await browser.url("/hw/store/catalog" + bugId);

        for (let i = 0; i <= 26; i++) {
            await browser.url(`/hw/store/catalog/${i}/` + bugId);
            const prodName = browser.$('.ProductDetails-Name')
            const prodDesc = browser.$('.ProductDetails-Description')
            const prodPrice = browser.$('.ProductDetails').$('.ProductDetails-Price')
            const prodColor = browser.$('.ProductDetails-Color')
            const prodMaterial = browser.$('.ProductDetails-Material')
            const prodBtn = browser.$('.ProductDetails-AddToCart')
            
            assert(await prodName.isExisting(), "Названия продкута нет")
            assert(await prodDesc.isExisting(), "Нет описания продукта")
            assert(await prodPrice.isExisting(), "Нет цены продукта")
            assert(await prodMaterial.isExisting(), "Нет материала продукта")
            assert(await prodColor.isExisting(), "Нет цвета продукта")
            assert(await prodBtn.isExisting(), "Нет кнопки")
        }
    })

    it('уже добавлен в корзину', async function({browser}) {
        await browser.url("/hw/store/catalog/" + bugId);

        const catalogContainer = await browser.$(".Catalog > .row:nth-child(2)");

        for (let i = 1; i <= 25; i++) {
            await browser.url("/hw/store/catalog/" + bugId);
            const item = await catalogContainer.$(`div:nth-child(${i})`)
            await item.waitForExist()

            const ProdItem = await catalogContainer.$('.ProductItem')
            const card_body = ProdItem.$(".card-body");
            
            const link = card_body.$(".card-link");

            await link.click()
            const prodBTN = browser.$('.ProductDetails-AddToCart')
            await prodBTN.click()
            
            const inCart = browser.$('.CartBadge')
            await browser.url("/hw/store/catalog/" + bugId)
            const inCatalog = browser.$('.CartBadge')

            assert(await inCart.isExisting(), "Нет сообщения о добавлении в details")
            assert(await inCatalog.isExisting(), "Нет сообщения о добавлении в каталоге")
        }
    })
   
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
        const val = await counter.getText()
        
        assert(await val == '2' ? true: false, "Счетчик в корзине не обновляется")
    })

})


