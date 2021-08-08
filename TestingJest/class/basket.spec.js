const BasketMock = require('./BasketMock')
const {add_product_store,code_html, post_fixture_null, post_fixture_real, post_fixture_fake} = require('../fixtures/datas')

const LocalStorageMock = require('../fixtures/localStorage')
global.localStorage = new LocalStorageMock()

const $ = global.jQuery = require('jquery')
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const dom = (new JSDOM(code_html(),{  
    contentType : "text/html" , 
    includeNodeLocations : true , 
    storageQuota : 10000000 
}))

describe('Cart implementation',() => {
    it('add 1 products to the cart',()=> {
        const basket = new BasketMock()
        basket.add_product_basket("5be1ed3f1c9d44000030b061")
        expect(Object.values(localStorage.storage).length).toEqual(1)
    })
    
    it('add 2 products to the cart',()=> {
        localStorage.clear()
        const basket = new BasketMock()
        basket.add_product_basket("5be1ed3f1c9d44000030b061")
        basket.add_product_basket("5be1ed3f1c9d44000030b061")
        expect(Object.values(localStorage.storage).length).toEqual(2)
    })

    it('Retrieve a first product in cart',()=> {
        localStorage.clear()
        const basket = new BasketMock()
        basket.add_product_basket("5be1ed3f1c9d44000030b061")
        const product = localStorage.getItem('productAdd_1')
        expect(JSON.parse(product)).toEqual({"_id":"5be1ed3f1c9d44000030b061"})
    })

    it('Display number of products with the cart empty',()=> {
        localStorage.clear()
        const basket = new BasketMock()
        var numberProducs = basket.number_products_basket()
        numberProducs == 0 ? numberProducs = "" : numberProducs
        expect(dom.window.document.getElementById("count_product").textContent).toEqual('')
    })

    it('Display number of products with 3 products in the cart',()=> {
        localStorage.clear()
        localStorage.setItem(`fixture`,JSON.stringify({"_id":"5be1ed3f1c9d44999930b099"}))
        add_product_store()
        const basket = new BasketMock()
        const numberProducs = basket.number_products_basket()

        const dom2 = (new JSDOM(code_html(numberProducs),{  
            contentType : "text/html" , 
            includeNodeLocations : true , 
            storageQuota : 10000000 
        }))
        expect(dom2.window.document.getElementById("count_product").textContent).toEqual('3')
    })

    it('remove a product to the cart contain 3',()=> {
        const basket = new BasketMock()
        localStorage.clear()
        localStorage.setItem(`fixture`,JSON.stringify({"_id":"5be1ed3f1c9d44999930b099"}))
        add_product_store()
        basket.remove_product("5be1ed3f1c9d44000030b061")
        expect(Object.values(localStorage.storage).length).toEqual(3)
    })

    it('remove a product to the cart empty',()=> {
        localStorage.clear()
        const basket = new BasketMock()
        basket.remove_product("5be1ed3f1c9d44000030b061")
        expect(Object.values(localStorage.storage).length).toEqual(0)
    })
})
describe('Post data for server',() => {

    it('With empty datas',()=> {
        localStorage.clear()
        const basket = new BasketMock()
        post_fixture_null(localStorage)
        const datas = basket.datas_format_backend(localStorage)
        expect(datas.contact).toEqual({})
        expect(localStorage.storage.contact).toEqual("{}")
        expect(datas.products).toEqual([])
        expect(localStorage.storage.products).toEqual("[]")
    })

    it('With properly formatted data',()=> {
        const basket = new BasketMock()
        add_product_store()
        post_fixture_real(localStorage)
        const datas = basket.datas_format_backend(localStorage)
        expect(typeof(datas.contact)).toEqual("object")
        expect(typeof(datas.contact.lastName)).toEqual("string")
        expect(typeof(datas.contact.firstName)).toEqual("string")
        expect(typeof(datas.contact.email)).toEqual("string")
        expect(typeof(datas.contact.address)).toEqual("string")
        expect(typeof(datas.contact.postal)).toEqual("number")
        expect(typeof(datas.contact.city)).toEqual("string")
        expect(typeof(datas.contact.country)).toEqual("string")
        expect(typeof(datas.contact.date)).toEqual("string")
        expect(typeof(datas.products)).toEqual("object")
        expect(typeof(datas.products[0])).toEqual("string")
    })

    it('The server response ',() => {
        localStorage.clear()
        post_fixture_real(localStorage)
        const basket = new BasketMock()
        const datas = basket.datas_format_backend(localStorage)
        basket.add_order(datas)
        expect(Object.values(localStorage.storage).length).toEqual(3)
        const keys = Object.keys(localStorage.storage)
        var validContain = 0
        for (let i = 0; i < keys.length; i++) {
            if(keys[i]=='contact' || keys[i]=='products' || keys[i]=='orderId'){
                validContain++
            }
        }
        expect(validContain).toEqual(3)
    })

})
