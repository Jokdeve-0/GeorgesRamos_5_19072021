const $ = global.jQuery = require('jquery')
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const Contact = require('../../src/js/class/Contact')

const { box_basket } = require("../../src/js/components/boxBasket")
const { box_form } = require("../../src/js/components/boxForm")
const { box_product} = require("../../src/js/components/boxProduct")
const { valid_order_model } = require("../../src/js/components/validOrderModel")

describe('Using components', () => {

    it('Display box basket',() => {
        const dom = (new JSDOM(box_basket({_id:"xxx",name:"testingName",imageUrl:"http://localhost/imageUrl",price:100},"basket")))
        expect(dom.window.document.querySelector('i.remove').getAttribute('data-target')).toEqual('xxx')
        expect(dom.window.document.querySelector('img').getAttribute('src')).toEqual('http://localhost/imageUrl')
        expect(dom.window.document.querySelector('i.remove').getAttribute('data-target')).toEqual('xxx')
        expect(dom.window.document.querySelector('p:nth-child(3)').textContent).toEqual('testingName')

        const dom2 = (new JSDOM(box_basket({name:"testingName",price:100},"valid")))
        expect(dom2.window.document.querySelector('p:nth-child(2)').textContent).toEqual('testingName')
        expect(dom2.window.document.querySelector('p:nth-child(3)').textContent).toEqual("1.00€")

    })

    it('Display headers form', () => {
        const dom = (new JSDOM(box_form()))
        expect(!dom.window.document.getElementById('section-basket').contains).toEqual(false)
    })
    
    it('Display box of product', () => {
        const displayChoices = "", description_home = "", button = "", description_product = "", i = 1
        const product = {name:"testingName",imageUrl:"http://localhost/imageUrl",price:100}
        const dom = (new JSDOM(box_product(displayChoices, description_home, product, description_product, button, i)))
        expect(!dom.window.document.querySelector('.product').contains).toEqual(false)
    })
    
    it('Display information of order', () => {
        const contact = new Contact("nom","prenom","email","address","postal","city","country","date")
        const dom = (new JSDOM(valid_order_model(contact,{orderId:"orderxxx"})))
        expect(!dom.window.document.querySelector('#section-order')).toEqual(false)
    })
})