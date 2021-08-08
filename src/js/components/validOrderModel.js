// ################################################
//  Model builder for displaying order information
// ################################################
module.exports = {
    valid_order_model: (contact, orderId) => {
        return `<section id="section-order">
            <div id="Info">
                <h3>Merci  ${contact['firstName']}<br>Votre commande a été enregistée !</h3>
                <p>Le ${contact['date']}</p>
                <p>N° de commande <br>${orderId}</p>
                <p>Adresse de livarison :<br>
                    ${contact['address']}<br>
                    ${contact['postal']}<br>
                    ${contact['city']}<br>
                    ${contact['country']}
                </p>
                <p>Votre Email :  ${contact['email']}</p>
                <p>
                    Vous allez reçevoir un email de confirmation à cette adresse
                    <i class="fas fa-exclamation-triangle"></i> (*Factice)
                </p>
            </div>
        </section>`
    }
}