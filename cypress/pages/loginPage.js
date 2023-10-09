/// <reference types="cypress" />

class loginPage {

  elements = {
    //Locators
    userNameInput: () => cy.get(`[data-test="username"]`),
    userPassInput: () => cy.get(`[data-test="password"]`),

    loginSubmitBtn: () => cy.get(`[data-test="login-button"]`)

  }

  //Functions

  userlogin(userName, pass) {
    cy.session([userName, pass], () => {
      cy.visit('/ ')
      cy.url().should('include', 'saucedemo')
      this.elements.userNameInput().clear().type(userName)
      this.elements.userPassInput().clear().type(pass)
      this.elements.loginSubmitBtn().click()
      cy.getCookie('session-username').should('exist')

    })


  }




}

module.exports = new loginPage()