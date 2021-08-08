const {control_h1, control_h2, add_product_store,fill_form} = require('../support/commands')
const {AppUrl} = require('../0_config_before_test')
const Contact = require('../../src/js/class/Contact')

const appUrl = AppUrl()
const dates = new Date()
const contact = new Contact(
"Bond",'James','James.Bond@007.mov','Hollywood boulevard','99999','Hollywood','Californie',
dates.toLocaleDateString('fr-FR',{ year: 'numeric', month: 'numeric', day: 'numeric'})
)

describe('Redirection to the valid page after validation of the form', () => {
    
    beforeEach(() => {
        cy.visit(`${appUrl}?page=basket`)
        add_product_store()
        cy.get('#lastName').type("Bond")
            .get('#firstName').type('James')
            .get('#email').type('James.Bond@007.mov')
            .get('#address').type('Hollywood boulevard')
            .get('#postal').type(99999)
            .get('#city').type('Hollywood')
            .get('#country').type('Californie')
            .get('#btn_validOrder')
            .click()
    })

    it('Display of dynamic headers', () => {
        control_h1('Votre commande est validée !')
        control_h2("Informations de la commande")
    })

    it('The display of the summary of the products to order', () => {
        cy.get('.line').should('be.visible')
        cy.get('div.line:nth-child(2) > p:nth-child(1) > img:nth-child(1)')
            .first()
            .should('have.attr','src')
            .and('match', /http:\/\/localhost:3000/)
        cy.get('.line-total')
    })

    it('the display of the summary of the order information', () => {
        cy.get('#Info').should('be.visible')
        cy.get('h3').should('have.length',"1").contains('Merci')
        cy.get('#Info').children('p').should("have.length",5)
        cy.get('#Info > p:nth-child(3)').should('not.be.empty')
    })
})