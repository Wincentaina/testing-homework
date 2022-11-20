
const { assert } = require('chai');

const bugId = "?bug_id=4";

describe('Корзина:', async () => { 
    it('уже добавлен в корзину', async function({browser}) {
        await browser.url("/hw/store/catalog/" + bugId);
    
        const catalogContainer = await browser.$(".Catalog > .row:nth-child(2)");
    
            await browser.url("/hw/store/catalog/" + bugId);
            const item = await catalogContainer.$(`div:nth-child(1)`)
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
        
    })

    it('содержимое корзины должно сохраняться между перезагрузками страницы', async function({browser}) {
        await browser.url("/hw/store/cart/" + bugId);
        const table = await browser.$('.Cart-Table')
        assert(await table.isExisting(), "содержимое корзины не сохраняется")
    })

    it('таблица существует', async function({browser}) {
        await browser.url("/hw/store/cart/" + bugId);
        const table = await browser.$('.Cart-Table')
        assert(await table.isExisting(), "таблица не существует")
    })

    it('по нажатию на "очистить корзину" все товары должны удаляться', async function({browser}) {
        await browser.url("/hw/store/catalog/0" + bugId);
        const prodBTN = browser.$('.ProductDetails-AddToCart')
        await prodBTN.click()

        await browser.url("/hw/store/cart/" + bugId);
        const clearBtn = await browser.$('.Cart-Clear')
        const table = await browser.$('.Cart-Table')

        const tableStatus = await table.isExisting()
        await clearBtn.click()

        const newTable = await browser.$('.Cart-Table')
        const inf = await newTable.isExisting()
        const res = !inf && tableStatus
        
        assert(res, "Корзина не очистилась")
    })

    it('пустая корзина - сыслка', async function({browser}) {
        await browser.url("/hw/store/catalog/0" + bugId);
        const prodBTN = browser.$('.ProductDetails-AddToCart')
        await prodBTN.click()

        await browser.url("/hw/store/cart/" + bugId);
        const clearBtn = await browser.$('.Cart-Clear')
        await clearBtn.click()

        const newTable = await browser.$('.Cart-Table')
        const inf = await newTable.isExisting()
        
        assert(!inf, "Ссылки нет")
    })

    it('в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней ', async function({browser}) {
        await browser.url("/hw/store/catalog/0" + bugId);
        const prodBTN = browser.$('.ProductDetails-AddToCart')
        await prodBTN.click()

        const menu = await browser.$(".Application-Menu > .navbar-nav")
        const cartItem = await menu.$(".cart-link")
        const cartItemText = await cartItem.getText()


        const res = await cartItemText != "Cart"? true: false

        assert(res, "Не отображается количество не повторяющихся товаров в корзине")
    })

    it('для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа ', async function({browser}) {
        await browser.url("/hw/store/catalog/0" + bugId);
        const prodBTN = browser.$('.ProductDetails-AddToCart')
        await prodBTN.click()

        await browser.url("/hw/store/catalog/1" + bugId);
        const prod2BTN = browser.$('.ProductDetails-AddToCart')
        await prod2BTN.click()

        await browser.url("/hw/store/cart/" + bugId);
        const newTable = await browser.$('.Cart-Table')
        const inf = await newTable
        console.log("fs2812341", inf);
        const first = inf.$$("tbody > tr")[0]
        const n1 = await first.$('.Cart-Name').isExisting()
        const p1 = await first.$('.Cart-Price').isExisting()
        const c1 = await first.$('.Cart-Count').isExisting()
        const t1 = await first.$('.Cart-Total').isExisting()
        const second = inf.$$("tbody > tr")[1]
        const n2 = await second.$(".Cart-Name").isExisting()
        const p2 = await second.$(".Cart-Price").isExisting()
        const c2 = await second.$(".Cart-Count").isExisting()
        const t2 = await second.$(".Cart-Total").isExisting()

        const took = await browser.$(".Cart-OrderPrice").isExisting()

        assert(await n1 && n2, "не отображаться имя")
        assert(await p1 && p2, "не отображаться цена")
        assert(await c1 && c2, "не отображаться кол-во")
        assert(await t1 && t2, "не отображаться результат")
        assert(await took, "не отображаться общий результат")

    })
})
