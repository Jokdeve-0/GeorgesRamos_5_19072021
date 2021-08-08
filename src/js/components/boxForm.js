// ################################
// Form header display constructor
// ################################
module.exports = {
    box_form: () => {
        return `
        <section id="section-basket">
            <div id="box-products">
                <h2>Contenu de votre panier</h2>
            </div>
            <div id="box-form">
                <h2>Formulaire de commande</h2>
                <p>Veuillez compléter l'intégralité du formulaire pour valider votre commande</p>
                <form></form>
            </div>
        </section>`
    }
}