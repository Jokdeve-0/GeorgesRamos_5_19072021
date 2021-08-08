const $ = global.jQuery = require('jquery')

const LocalStorageMock = require('../fixtures/localStorage')
global.localStorage = new LocalStorageMock()

class Basket {
    
    add_product_basket(idProduct) {
        // var counter = localStorage.length+1
        const counter = Object.values(localStorage.storage).length + 1
        var currentProduct = {}
        currentProduct._id = idProduct
        localStorage.setItem("productAdd_" + counter, JSON.stringify(currentProduct))
    }

    remove_product(id) {
        const arKeys = Object.keys(localStorage.storage)
        // for (let i = 0; i < localStorage.length; i++) {
        for (let i = 0; i < arKeys.length; i++) {
            // var product = JSON.parse(localStorage[localStorage.key(i)])
            var product = JSON.parse(localStorage.storage[arKeys[i]])
            if( id == product._id){
                localStorage.removeItem(arKeys[i])
                return true
            }else{
                continue
            }
        }
    }

    number_products_basket() {
        const arKeys = Object.keys(localStorage.storage)
        var numberProducs = 0
        // for (let i = 0; i < localStorage.length; i++) {
        for (let i = 0; i < arKeys.length; i++) {
            // if (/^productAdd_/.test(localStorage.key(i))) {
            if (/^productAdd_/.test(arKeys[i])) {
                numberProducs++
            }
            else{
                continue
            }
        }
        // numberProducs > 0 ? document.getElementById('count_product').innerText = numberProducs : false
        return numberProducs
    }

    datas_format_backend(localStorage){
        var arrayProducts = []
        const arrayKeys = Object.keys(localStorage.storage)
        for (let i = 0; i < Object.values(localStorage.storage).length; i++) {
            if(/^productAdd_/.test(arrayKeys[i])){
                var productCurrent = JSON.parse(localStorage.storage[arrayKeys[i]])
                arrayProducts.push(productCurrent._id)
            }
            else{
                continue
            }
        }
        const content = {"contact" : JSON.parse(localStorage.storage.contact),"products" : arrayProducts}
        return content
    }

    add_order(productsDatas) {
        localStorage.setItem('contact',JSON.stringify(productsDatas['contact']))
        localStorage.setItem('products',JSON.stringify(productsDatas['products']))
        localStorage.setItem('orderId',"fake!orderId")
        return this.storage
    }
}
module.exports = Basket