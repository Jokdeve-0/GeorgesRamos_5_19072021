const $ = require('jquery')
const Contact = require('./Contact')
// ################################################################################
// BASKET is a module which contains all the implementation methods of the cart,
// the validations of the form and the formatting of the poster data
// ################################################################################
class Basket {
    // ##########################
    // Add a product to the cart
    // ##########################
    /**
     * @param {STRING} idProduct 
     */
    add_product_basket(idProduct) {
        // Suppresses the template selection error message if it is displayed
        $('#sms_error') ? $('#sms_error').remove() : false
        if ($("#choices").val() == "") {
            // Display the selection error message if a model is not chosen 
            $('.description-prod').after('<div id="sms_error"><span><i class="fas fa-exclamation"></i></i>Veuillez sélectionner un modèle</span></div>')
            return false
        } else {
            // Add a product to the cart
            var counter = localStorage.length + 1
            var currentProduct = {}
            currentProduct._id = idProduct
            localStorage.setItem("productAdd_" + counter, JSON.stringify(currentProduct))
            return true
        }
    }
    // ############################################
    // Displays the number of products in the cart
    // ############################################
    number_products_basket() {
        var numberProducs = 0
        for (let i = 0; i < localStorage.length; i++) {
            if (/^productAdd_/.test(localStorage.key(i))) {
                numberProducs++
            }
        }
        numberProducs > 0 ? document.getElementById('count_product').innerText = numberProducs : false
    }
    // ###############################
    // Remove a product from the cart
    // ###############################
    /**
     * @param {STRING} id 
     */
    remove_product(id) {
        for (let i = 0; i < localStorage.length; i++) {
            var product = JSON.parse(localStorage[localStorage.key(i)])
            if (id == product._id) {
                localStorage.removeItem(localStorage.key(i))
                return true
            }
        }
    }
    // ################
    // Form validation
    // ################
    form_validation() {
        // regex pattern
        const regexText = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const regexAddress = /^[\w'\-,.0-9][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
        const regexPostal = /^[0-9]{5,5}$/
        // validation pass
        var validOk = true
        // delete old error messages
        $('.noValid').remove()
        // validation all inputs
        if ($("#lastName").val() == "" || !regexText.test($("#lastName").val())) {
            $("#lastName").before('<p class="noValid">Veuillez entrez un Nom valide.</p>')
            validOk = false
        }
        if ($("#firstName").val() == "" || !regexText.test($("#firstName").val())) {
            $("#firstName").before('<p class="noValid">Veuillez entrez un Prénom valide.</p>')
            validOk = false
        }
        if ($("#email").val() == "" || !regexEmail.test($("#email").val())) {
            $("#email").before('<p class="noValid">Veuillez entrez une Adresse email valide.</p>')
            validOk = false
        }
        if ($("#address").val() == "" || !regexAddress.test($("#address").val())) {
            $("#address").before('<p class="noValid">Veuillez entrez une Adresse valide.</p>')
            validOk = false
        }
        if ($("#postal").val() == "" || !regexPostal.test($("#postal").val())) {
            $("#postal").before('<p class="noValid">Veuillez entrez un code postal a 5 chiffres.</p>')
            validOk = false
        }
        if ($("#city").val() == "" || !regexText.test($("#city").val())) {
            $("#city").before('<p class="noValid">Veuillez entrez une Ville valide.</p>')
            validOk = false
        }
        if ($("#country").val() == "" || !regexText.test($("#country").val())) {
            $("#country").before('<p class="noValid">Veuillez entrez un pays valide.</p>')
            validOk = false
        }
        // validated form, add a contact object in the localStorage
        if (validOk) {
            const dates = new Date()
            const contact = new Contact(
                $("#lastName").val(),
                $("#firstName").val(),
                $("#email").val(),
                $("#address").val(),
                $("#postal").val(),
                $("#city").val(),
                $("#country").val(),
                dates.toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                })
            )
            localStorage.setItem("contact", JSON.stringify(contact))
            return true
        }
    }
    // ###################################
    // Format the data sent to the server
    // ###################################
    datas_format_backend() {
        var arrayProducts = []
        for (let i = 0; i < localStorage.length; i++) {
            if (/^productAdd_/.test(localStorage.key(i))) {
                var productCurrent = JSON.parse(localStorage[localStorage.key(i)])
                arrayProducts.push(productCurrent._id)
            }
        }
        const content = {
            "contact": JSON.parse(localStorage.contact),
            "products": arrayProducts
        }
        return content
    }
    // ###################################################
    // Add the response of the server in the localStorage
    // ###################################################
    add_order(productsDatas) {
        localStorage.setItem('contact', JSON.stringify(productsDatas['contact']))
        localStorage.setItem('products', JSON.stringify(productsDatas['products']))
        localStorage.setItem('orderId', JSON.stringify(productsDatas['orderId']))
        return this.storage
    }
}
module.exports = Basket