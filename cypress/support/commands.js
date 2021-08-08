const $ = require('jquery')
module.exports = {
    AppUrl: (port = 5500)=>{
        return `http://127.0.0.1:${port}/`
    },
    total_basket_first_product: (numberProducts) => {
        cy.get('.line')
            .first()
            .children('p:nth-child(4)')
            .invoke('text')
            .then((text)=>{
                let price = parseInt(text.trim())
                cy.get('.line').first().children(' p:nth-child(4)').should('have.text',`${price}€`)
                cy.get('.line-total').children(' p:nth-child(2)').should('have.text',`${price*numberProducts}€`) 
            })
    },
    fill_form: (lastName,firstName,email,address,postal,city,country,Errors) => {
        cy.get('#lastName').type(lastName)
            .get('#firstName').type(firstName)
            .get('#email').type(email)
            .get('#address').type(address)
            .get('#postal').type(postal)
            .get('#city').type(city)
            .get('#country').type(country)
            .get('#btn_validOrder')
            .click()
            .get('.noValid').should('have.length',Errors)
            .reload()
    },
    add_product_store: () => {
        const count = localStorage.length+1
        localStorage.setItem(`productAdd_${count}`,JSON.stringify({"_id":"5be1ed3f1c9d44000030b061"}))
        localStorage.setItem(`productAdd_${count+1}`,JSON.stringify({"_id":"5be1ed3f1c9d44000030b061"}))
        localStorage.setItem(`productAdd_${count+2}`,JSON.stringify({"_id":"5be1ed3f1c9d44000030b061"}))
    },
    control_h1: (texte) => {
        cy.get('#section-title').should('have.length', 1)
            .contains('h1',`Ori*Cameras.com${texte}`)
    },
    control_h2: (texte) => {
        cy.get('#section-products').should('have.length', 1)
            .contains('h2',texte)
            .get('#box-products').should('have.length', 1)
            .get('#section-products').should('have.length', 1)
    },
    control_cart: (count) => {
        cy.get('#count_product').should('have.text',`${count}`)
    },
    with_x_products: (arrayNumberProducts,idOnUrl,appUrl)=> {

        cy.visit(appUrl)
        cy.get(arrayNumberProducts).each( () => {          
            cy.get('.btn_product')
                .first()
                .click()
                .intercept(`/?page=product&id=${idOnUrl}`)
                .get('option')
                .last()
                .invoke('text')
                .then((text)=>{
                    cy.get('select')
                    .select(text.trim())
                })
            cy.get('#btn_addProduct')
                .click()
                .get('#closersms')
                .click()
        })
        cy.visit(`${appUrl}?page=basket`)
    }

}