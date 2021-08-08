const {control_h1, control_h2} = require('../support/commands')
const {AppUrl} = require('../0_config_before_test')
const { get_var_url } = require('../../src/js/utils/getVarUrl')
const appUrl = AppUrl()
const idOnUrl = get_var_url('id')

describe('Redirection to the product page after selecting a product', () => {

    beforeEach(() => {
        cy.visit(appUrl).get('.btn_product').first().click()
    })

    it('Product display on the page with a image and a menu of models', () => {
        cy.get('.product').should('be.visible')
        cy.get('.img-prod > img:nth-child(1)').first().should('have.attr','src')
        .and('match', /http:\/\/localhost:3000/)
        cy.get('#choices').children('option').should('be.visible')
    })

    it('Display of dynamic headers', () => {
        control_h1('Voici l\'article séléctioné')
        control_h2("Détails de l'article")
    })

    it('Add a product to the cart without specifying a model then specified the model and add to the cart', () => {
        // Without specifying a model
        cy.get('#btn_addProduct').click()
        // display error message
        cy.get('#sms_error').should('have.text','Veuillez sélectionner un modèle')

        // then specified the model 
        cy.get('option').last().invoke('text').then((text)=>{
            cy.get('select').select(text.trim())
        })

        // The error message is no longer displayed 
        cy.get('#sms_error').should('not.exist')

        // Add to the basket
        cy.get('#btn_addProduct').click().get('#closersms').click()
        cy.get('#count_product').should('have.text','1')
    })

    it('Add two products to the basket', () => {
        cy.get('option').last().invoke('text')
        .then((text)=>{
            cy.get('select').select(text.trim())
        })
        cy.get('#btn_addProduct').click().get('#closersms').click()
        cy.visit(appUrl).get('.btn_product').first().click()
        cy.get('option').last().invoke('text')
        .then((text)=>{
        cy.get('select')
            .select(text.trim())
        })
        cy.get('#btn_addProduct').click().get('#closersms').click()
        cy.get('#count_product').should('have.text','2')
    })

    it('Reset the application by emptying the cart', () => {
        cy.get('#reload').click().get('#count_product').should('have.text','')
    })
    
})