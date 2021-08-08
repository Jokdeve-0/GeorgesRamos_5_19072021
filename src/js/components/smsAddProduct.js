// ###################################
//  Builder for a confirmation message 
//  for the addition of the product
// ###################################
const $ = require('jquery')
module.exports = {
    sms_add_product: () => {
        $('header').before(`<div id="addOk" style="display:none;">
            <div>
                <p>L'article est ajouté au panier !</p>
                <i class="fas fa-times" id="closersms"></i>
            </div>
        </div>`)
    }
}