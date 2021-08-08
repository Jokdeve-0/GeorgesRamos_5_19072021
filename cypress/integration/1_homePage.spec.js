const {control_h1, control_h2, control_cart} = require('../support/commands')
const {AppUrl} = require('../0_config_before_test')
const {get_var_url} = require('../../src/js/utils/getVarUrl.js')
const appUrl = AppUrl()
const idOnUrl = get_var_url('id')

describe('On the home page when the document is loaded', () => {
    
    beforeEach(() => {
        cy.visit(appUrl)
    })

    it('Product display on the page', () => {
        cy.get('.product').should('be.visible')
        cy.get('.img-prod > img:nth-child(1)')
            .first()
            .should('have.attr','src')
            .and('match', /http:\/\/localhost:3000/)
    })

    it('display of the number of products with an empty basket', () => {
        cy.get('#count_product').should('have.text',"")
    })

    it('Display of dynamic headers ', () => {
        control_h1('vous souhaite la bienvenue')
        control_h2("Nos derniers Articles")
    })
    
    it('Selection of the first product ', () => {
        cy.get('.btn_product')
            .first()
            .click()
            .intercept(`/?page=product&id=${idOnUrl}`)
    })

    it('Selection of the last product ', () => {
        cy.get('.btn_product')
            .last()
            .click()
            .intercept(`/?page=product&id=${idOnUrl}`)
    })

})