const $ = global.jQuery = require('jquery')
const jsdom = require("jsdom")
const { JSDOM } = jsdom


const { calculTotalBasket } = require("../../src/js/utils/calculTotal")
const { get_current_page } = require('../../src/js/utils/getCurrentPage')
const { get_var_url } = require("../../src/js/utils/getVarUrl")

describe('Using utils', () => {

    it('Calculate the total',() => {
        const calcul1 = calculTotalBasket([2,2,2,2,2])
        const calcul2 = calculTotalBasket([1,1,1,1,1])
        const calcul3 = calculTotalBasket([1,2,3,4,5])
        expect(calcul1).toEqual(10)
        expect(calcul2).toEqual(5)
        expect(calcul3).toEqual(15)
    })

    it('Get a variable in the URL and set the current page', () => {
        const dom = (new JSDOM('',{ 
            url:"http://localhost:5500/?page=home"
        }))
        global.window = dom.window
        const page = get_var_url("page")
        expect(page).toEqual("home")
        expect(get_current_page()).toEqual("home")

        const dom2 = (new JSDOM('',{ 
            url:"http://localhost:5500/?page=valid"
        }))
        global.window = dom2.window
        const page2 = get_var_url("page",dom2.window)
        expect(page2).toEqual("valid")
        expect(get_current_page()).toEqual("valid")

        const dom3 = (new JSDOM('',{ 
            url:"http://localhost:5500"
        }))
        global.window = dom3.window
        const page3 = get_var_url("page","Critical error no page in URL")
        expect(page3).toEqual("Critical error no page in URL")
        expect(get_current_page()).toEqual("home")
    })

})