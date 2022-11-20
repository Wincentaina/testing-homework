
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
})

