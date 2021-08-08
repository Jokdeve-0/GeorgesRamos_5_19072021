module.exports = {
    calculTotalBasket(allPrices){
        var total = 0
        allPrices.forEach(price => {
            total += price
        });
        return total
    }
}