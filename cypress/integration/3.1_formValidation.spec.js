const {fill_form, add_product_store} = require('../support/commands')
const {AppUrl} = require('../0_config_before_test')

const appUrl = AppUrl()

describe('Verification of the validity of the incorrect data transmitted in the form ', () => {
    
    beforeEach(() => {
        cy.visit(`${appUrl}?page=basket`)
    })
    
    it('With all inputs with a space as value',() => {
        fill_form(" "," "," "," "," "," "," ",'7')
    })
    
    it('With a error in lastName',() => {
        add_product_store()
        fill_form("Bond007",'James','James.Bond@007.mov','Hollywood boulevard','99999','Hollywood','Californie','1')
    })
    
    it('With a error in firstName',() => {
        fill_form("Bond",'James007','James.Bond@007.mov','Hollywood boulevard','99999','Hollywood','Californie','1')
    })
    
    it('With a error in email',() => {
        fill_form("Bond",'James','James.Bond@007','Hollywood boulevard','99999','Hollywood','Californie','1')
    })
    
    it('With a error in address',() => {
        fill_form("Bond",'James','James.Bond@007.mov','Hollywood $boulevard','99999','Hollywood','Californie','1')
    })
    
    it('With a error in code postal',() => {
        fill_form("Bond",'James','James.Bond@007.mov','Hollywood boulevard','99@999','Hollywood','Californie','1')
    })
    
    it('With a error in city',() => {
        fill_form("Bond",'James','James.Bond@007.mov','Hollywood boulevard','99999','Holly@wood','Californie','1')
    })
    
    it('With a error in country',() => {
        fill_form("Bond",'James','James.Bond@007.mov','Hollywood boulevard','99999','Hollywood','Cali@fornie','1')
    })
    
})