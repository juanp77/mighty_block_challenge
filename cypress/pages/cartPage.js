/// <reference types="cypress" />

class cartPage {
    locators = {
        cartListContainer: () => cy.get('.cart_list'),
        checkoutBtn: () => cy.get(`[data-test="checkout"]`)
    }

    //Functions

    getTotalItemsOnCart(itemsNumber) {
        this.locators.cartListContainer().should('be.visible').then(($list) => {
            cy.get($list).find('.cart_item').should('have.length', itemsNumber)
        })
    }

    goToCheckout() {
        this.locators.checkoutBtn().click()
        cy.url().should('include', 'checkout-step-one')
    }

}

module.exports = new cartPage()