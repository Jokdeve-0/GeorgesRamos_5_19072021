// #########################################
// display manufacturer of ordered products
// #########################################
module.exports = {
    box_basket: (product, page) => {
        var add_icon_remove = page == "basket" ? `<p><i class="fas fa-trash-alt remove" data-target="${product._id}"></i></p>` : ""
        var add_style = page == "valid" ? `class="style_valid"` : ""
        const boxBasket = `
            <div class="line">
                ${add_icon_remove}
                <p><img src="${product.imageUrl}" alt=""></p>
                <p>${product.name}</p>
                <p ${add_style}>${(product.price/100).toFixed(2)}€</p>
            </div>`
        return boxBasket
    }
}