// ###################################
//  Model builder for product display 
// ###################################
module.exports = {
    box_product(displayChoices, description_home, product, description_product, button, i) {
        return `
<div class="product index${i}">
    <div class="left-prod">
        <div class="img-prod">
            <img src="${product["imageUrl"]}" alt="${product["name"]}">
        </div>
    </div>
    <div class="right-prod">
        <div class="title-prod">
            <h3>${product["name"]}</h3>
        </div>
        <div class="select-prod">
            <p>Les modèles</p>
            ${displayChoices}
        </div>
        ${description_home}
    </div>
    <div class="bot-prod">
        ${description_product}
        <div class="btn_access-prod">
            ${button}
        </div>
        <div class="price-prod">
            <p>Prix : </p>
    <p>${(product["price"]/100).toFixed(2)}€</p>
        </div>
    </div>
</div>`
    }
}