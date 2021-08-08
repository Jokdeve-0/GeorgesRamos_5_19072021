const fetch = require("node-fetch")
const showSMS = require('../utils/log.format').ConsoleLogFormatted
// ###########################################################
// APILINK is a module which contains the requests for the API
// ###########################################################
class APILink {
    constructor(url) {
        this.url = url
    }
    // ###################
    // Retrieves all data
    // ###################
    async get_all_products() {
        try {
            const res = await fetch(this.url)
            return res.json()
        } catch (e) {
            showSMS("APILink", 19, "API connection error message", "An error occurred while retrieving data. Please check that the API server is running on port 3000. ")
            return false
        }
    }
    // ##############################
    // Retrieves a product by its id
    // ##############################
    /**
     * @param {STRING} id 
     */
    async get_one_product(id) {
        try {
            const res = await fetch(this.url + '/' + id)
            if (res.ok) {
                return res.json()
            } else {
                return undefined
            }
        } catch (e) {
            showSMS("APILink", 37, "API connection error message", "An error occurred while retrieving the item.")
            return false
        }
    }
    // ####################################
    //  Sends validated data to the server
    // ####################################
    /**
     * @param {{OBJECT},{OBJECT:ARRAY}} content 
     * Details {contact:{(*class Contact)},products:[STRING id,STRING id,...]}
     */
    async post_contact(content) {
        try {
            const post = await fetch(this.url + '/order', {
                method: "POST",
                body: JSON.stringify(content),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            return post.json()
        } catch (e) {
            showSMS("APILink.js", 62, "API connection error message", "An error occurred while sending data to the API. Please check that the data sent is formatted correctly.")
            return false
        }
    }
}
module.exports = APILink