const $ = require('jquery')
const {calculTotalBasket} = require('../utils/calculTotal')
const {get_current_page} = require('../utils/getCurrentPage')
const {box_product} = require('../components/boxProduct')
const {box_form} = require('../components/boxForm')
const {valid_order_model} = require('../components/validOrderModel')
const {box_basket} = require('../components/boxBasket')
// #################################################################################
// BUILDERCURRENTPAGE is a module which contains all the DOM implementation methods 
// #################################################################################
class BuilderCurrentPage {
    constructor() {
        this.page = get_current_page()
    }
    // ##############################
    //          SECTION BUILDER
    // ##############################
    // Builds the display of the current page
    build_page_current(productsDatas) {
        switch (this.page) {
            case "home":
                // Dynamic headers
                $('h1').append('<small>vous souhaite la bienvenue</small>')
                $('main').append('<section id="section-products"></section>')
                $('#section-products').append('<h2>Nos derniers Articles</h2><div id="box-products"></div>')
                // Build the display of all objects 
                this.build_products(productsDatas)
                break
            case "product":
                // Dynamic headers
                $('h1').append('<small>Voici l\'article séléctioné</small>')
                $('main').append('<section id="section-products"></section>')
                $('#section-products').append('<h2>Détails de l\'article</h2><div id="box-products"></div>')
                // Build the object display 
                this.build_one_product(productsDatas)
                break
            case "basket":
                // Dynamic headers
                $('h1').append('<small>Confirmez votre commande</small>')
                $('main').append('<section id="section-products"></section>')
                $('#section-products').append('<h2>Récapitulatif de votre commande</h2>')
                // Build the form display 
                $('main').append(box_form())
                this.createGroupForm($('form'), "Nom", "text", "lastName")
                this.createGroupForm($('form'), "Prénom", "text", "firstName")
                this.createGroupForm($('form'), "Email", "email", "email")
                this.createGroupForm($('form'), "Adresse", "text", "address")
                this.createGroupForm($('form'), "Code postal", "text", "postal")
                this.createGroupForm($('form'), "Ville", "text", "city")
                this.createGroupForm($('form'), "Pays", "text", "country")
                // initializes a price array for calculating the total
                const allPrices = []
                // Builds display of basket products
                for (let i = 0; i < productsDatas.length; i++) {
                    this.basket_model(productsDatas[i], allPrices)
                }
                $('#box-products').append(`<div class="line-total"><p>total</p><p>${(calculTotalBasket(allPrices)/100).toFixed(2)}€</p></div>`)
                $('form').append(`<button id="btn_validOrder" type="button">Validez votre commande</button>`)
                break
            case "valid":
                // Dynamic headers
                $('h1').append('<small>Votre commande est validée !</small>')
                $('main').append('<section id="section-products"></section>')
                $('#section-products').append('<h2>Informations de la commande</h2>')
                // Builds the display of ordered products
                this.build_valid(productsDatas)
                // Builds display of customer and order information
                this.build_order()
                break
            default:
                console.log('An error occurred in the display of the title section !')
        }
    }
    // Model builder for displaying all products
    build_products(productsDatas) {
        for (let i = 0; i < productsDatas.length; i++) {
            var choices = productsDatas[i]["lenses"].join(' <br> ')
            var displayChoices = `<p>${choices}</p>`
            var description_home = `<div class="description-prod sm-hide"><p>Description</p><p>${productsDatas[i]["description"].substring(0,80)+'...'}</p></div>`
            var description_product = ""
            var button = `<button type="button" data-target="${productsDatas[i]["_id"]}" class="btn_product">Voir l'Articles</button>`
            $('#box-products').append(box_product(displayChoices, description_home, productsDatas[i], description_product, button, i))
        }
    }
    // Model builder for displaying a product
    build_one_product(productsDatas) {
        for (let i = 0; i < productsDatas.length; i++) {
            var choices = ""
            for (let index = 0; index < productsDatas[i]["lenses"].length; index++) {
                choices += `<option value="${productsDatas[i]["lenses"][index]}">${productsDatas[i]["lenses"][index]}</option>`
            }
            var displayChoices = (`<select name="choices" id="choices"><option value="">Votre choix</option>${choices}</select>`)
            var description_home = ""
            var description_product = (`<div class="description-prod"><p>Description</p><p>${productsDatas[i]["description"]}</p></div>`)
            var button = `<button type="button"" id="btn_addProduct">Ajouter au panier</button>`
            $('#box-products').append(box_product(displayChoices, description_home, productsDatas[i], description_product, button, i))
        }
    }
    // Builder of the display of ordered products
    build_valid(productsDatas) {
        $('main').append(`
                <section id="section-basket">
                    <div id="box-products">
                    </div>
                </section>
            `)
        const allPrices = []
        for (let i = 0; i < productsDatas.length; i++) {
            this.basket_model(productsDatas[i], allPrices)
        }
        $('#box-products').append(`<div class="line-total"><p>total</p><p>${(calculTotalBasket(allPrices)/100).toFixed(2)}€</p></div>`)
    }
    // Builder of the display of customer and order information
    build_order() {
        const contact = JSON.parse(localStorage["contact"])
        // const products = JSON.parse(localStorage["products"])
        const orderId = localStorage["orderId"]
        $('main').append(valid_order_model(contact, orderId))
    }
    // ##############################
    //          MODEL BUILDER
    // ##############################
    // Model builder of ordered products 
    basket_model(product, allPrices) {
        for (let i = 0; i < localStorage.length; i++) {
            var productBasket = JSON.parse(localStorage[localStorage.key(i)])
            if (/^productAdd_/.test(localStorage.key(i))) {
                if (productBasket._id == product._id) {
                    $('#box-products').append(box_basket(product, this.page))
                    allPrices.push(product.price)
                }
            }
        }
    }
    // Builder form field model
    createGroupForm(parent, cl_text, cl_type, cl_id) {
        parent.append(`<div class="group"><label for="${cl_id}">${cl_text}</label><input type="${cl_type}" id="${cl_id}" required="required"></div>`)
    }
}
module.exports = BuilderCurrentPage