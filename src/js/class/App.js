const $ = require('jquery')
const APILink = require('./APILink')
const Basket = require('./Basket')
const BuilderCurrentPage = require('./BuilderPage')
const {get_var_url} = require('../utils/getVarUrl')
const {sms_add_product} = require('../components/smsAddProduct')
// ##########################################################################
// APP is a module that will execute the script according to the poduct page 
// ##########################################################################
class App {
    constructor() {
        this.apiLink = new APILink("http://localhost:3000/api/cameras")
        this.basket = new Basket()
        this.currentPage = new BuilderCurrentPage()
    }
    // ############################
    // Initializes the application
    // ############################
    async run() {
        // ##############################
        //          HOME PAGE
        // ##############################
        if (this.currentPage.page == "home") {
            // Query of all products
            const productsDatas = await this.apiLink.get_all_products()
            // Build the page
            this.currentPage.build_page_current(productsDatas)
            // On click --> selects a product by retrieving its id by data-target
            const btns = document.querySelectorAll('.btn_product')
            btns.forEach(btn => btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-target")
                // and redirects to the product page
                document.location.href = '/?page=product&id=' + id
            }))

        }
        // #############################
        //          PRODUCT PAGE
        // #############################
        if (this.currentPage.page == "product") {
            // the request retrieves the data of a product with its id
            const idProduct = get_var_url('id')
            const product = await this.apiLink.get_one_product(idProduct)
            // Build the paget
            this.currentPage.build_page_current([product])
            sms_add_product()
            // On click --> add a product to the cart
            $('#btn_addProduct').click(() => {
                const idProduct = get_var_url('id')
                const addOk = this.basket.add_product_basket(idProduct)
                // Display of {* a confirmation message *} for the addition of the product
                if (addOk) {
                    const hgh = $('body').outerHeight()
                    $('#addOk').attr("style", "height:" + hgh + "px;")
                    $('body').attr("style", "overflow:hidden;")
                }
            })
            // On click --> removes {* a confirmation message *} and redirects to the home page
            $('#closersms').click(() => {
                $('#addOk').attr("style", "display:none;")
                document.location.href = './'
            })
            // 
            // On focus --> suppresses the template selection error message if it is displayed
            $("#choices").on('focus', () => {
                $('#sms_error') ? $('#sms_error').remove() : false
            })
        }
        // #########################
        //        BASKET PAGE
        // #########################
        if (this.currentPage.page == "basket") {
            // Query of all products
            const productsDatas = await this.apiLink.get_all_products()
            // Build the page
            this.currentPage.build_page_current(productsDatas)
            // On click --> validates the form
            $('#btn_validOrder').click(async () => {
                // if the form is validated
                if (this.basket.form_validation()) {
                    // The request post the order data
                    const datasForBackEnd = this.basket.datas_format_backend()
                    const resp = await this.apiLink.post_contact(datasForBackEnd)
                    // Add the response of the server in the localStorage
                    this.basket.add_order(resp)
                    // and redirects to the valid page
                    document.location.href = "?page=valid"
                }
            })
            // On click --> remove a product from the cart
            const remove = document.querySelectorAll('.remove')
            remove.forEach(del => del.addEventListener("click", () => {
                const id = del.getAttribute("data-target")
                this.basket.remove_product(id)
                // If the basket is empty redirect to the home page
                if (localStorage.length == 0) {
                    document.location.href = "./"
                    return true
                } else {
                    document.location.href = "./?page=basket"
                    return true
                }
            }))
        }
        // #####################
        //      VALID PAGE
        // #####################
        if (this.currentPage.page == "valid") {
            // Query of all products
            const productsDatas = await this.apiLink.get_all_products()
            // Build the page
            this.currentPage.build_page_current(productsDatas)
            // Resets the application by cleaning the localStorage of all data
            localStorage.clear()
        }
        // #######################
        //      ALL PAGES
        // #######################
        // Displays in the header the number of products in the cart
        this.basket.number_products_basket()
        // On click resets the application by cleaning the localStorage of all data 
        // and redirects to the home page
        $("#reload").click(() => {
            localStorage.clear()
            document.location.href = "./"
        })
    }
}
module.exports = App