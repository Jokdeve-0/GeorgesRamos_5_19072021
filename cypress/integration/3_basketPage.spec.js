const {add_product_store, control_h1, control_h2, with_x_products,total_basket_first_product, fill_form} = require('../support/commands')
const {AppUrl} = require('../0_config_before_test')
const { get_var_url } = require('../../src/js/utils/getVarUrl')

const appUrl = AppUrl()
const idOnUrl = get_var_url('id')

describe('On the Basket page when the document is loaded', () => {

    beforeEach(() => {
        cy.visit(`${appUrl}?page=basket`)
    })

    it('Display of dynamic headers', () => {
        control_h1('Confirmez votre commande')
        control_h2("Récapitulatif de votre commande")
    })

    it('0 product in the cart and the total is 0€', () => {
        cy.get('.line').should('not.exist')
        cy.get('.line-total > p:nth-child(2)').invoke('text')
        .then((text)=>{
            cy.get('.line-total > p:nth-child(2)')
            .should('have.text',"0.00€")
        })
    })

    it('Add a product and observe the total ', () => {
        with_x_products([1],idOnUrl,appUrl)
        cy.get('.line').should('have.length','1')
        cy.get('.line')
            .first()
            .children('p:nth-child(4)')
            .invoke('text')
            .then((text)=>{
                let price = parseInt(text.trim())
                cy.get('.line').first().children(' p:nth-child(4)').should('have.text',`${price.toFixed(2)}€`)
                cy.get('.line-total').children(' p:nth-child(2)').should('have.text',`${price.toFixed(2)}€`) 
            })
    })
    
    it('Add 3 products 3 and observe the total', () => {
        with_x_products([1,2,3],idOnUrl,appUrl)
        cy.get('.line').should('have.length','3')
        cy.get('.line')
            .first()
            .children('p:nth-child(4)')
            .invoke('text')
            .then((text)=>{
                let price = parseInt(text.trim())
                cy.get('.line').first().children(' p:nth-child(4)').should('have.text',`${price.toFixed(2)}€`)
                cy.get('.line-total').children(' p:nth-child(2)').should('have.text',`${(price*3).toFixed(2)}€`) 
            })
    })

    it('Remove 1 product in the basket which contains 3', () => {
        add_product_store()
        cy.get('#box-products > div:nth-child(4) > p:nth-child(1) > i').click()
        cy.get('.line').should('have.length','2')
    })
    
    context('Form validation', () => {
        it('Validate the form with all inputs empty', () => {
            add_product_store()
            cy.visit(`${appUrl}?page=basket`)
            cy.get('#btn_validOrder').click()
            cy.get('.noValid').should('have.length','7')
        })
        
        it('validate the form with all valid inputs', () => {
            fill_form("Bond",'James','James.Bond@007.mov','Hollywood d\' boulevard','99999','Hollywood','Californie','0')
        })
        // More validation test in file: '3.1_formValidation.spec.js' 
    })

})