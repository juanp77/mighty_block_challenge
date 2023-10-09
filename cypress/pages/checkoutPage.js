/// <reference types="cypress" />

class checkoutPages {
    locators = {
        formContainer: () => cy.get('.checkout_info'),
        firstNameInput: () => cy.get(`[data-test="firstName"]`),
        lastNameInput: () => cy.get(`[data-test="lastName"]`),
        postalCodeInput: () => cy.get(`[data-test="postalCode"]`),
        continueBtn: () => cy.get(`[data-test="continue"]`),
        totalLabel: () => cy.get('.summary_total_label'),
        finishBtn: () => cy.get(`[data-test="finish"]`)
    }

    //functions

    fillCheckoutInfo(firstName, lastName, postalCode) {
        this.locators.formContainer().should('be.visible').then(() => {
            this.locators.firstNameInput().clear().type(firstName)
            this.locators.lastNameInput().clear().type(lastName)
            this.locators.postalCodeInput().clear().type(postalCode)
        })
    }

    clickOnContinuePurchase() {
        this.locators.continueBtn().click()
        cy.url().should('include', 'checkout-step-two')
    }

    verifyTotalPrice(totalPrice) {
        this.locators.totalLabel().should('contain.text', totalPrice)
    }

    finishPurchase() {
        this.locators.finishBtn().click()
        cy.url().should('include', 'checkout-complete')
    }
}
module.exports = new checkoutPages()