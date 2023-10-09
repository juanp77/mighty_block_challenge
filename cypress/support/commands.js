// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("setViewPort_Desktop", () => {
    cy.viewport(1200, 800)
});

Cypress.Commands.add("loginUser", (userName) => {
    cy.session(userName, () => {
        cy.visit('/').wait(3000)
        cy.url().should('include', 'saucedemo')
        cy.get(`[data-test="username"]`).clear().type(userName)
        cy.get(`[data-test="password"]`).clear().type('secret_sauce')
        cy.get(`[data-test="login-button"]`).click()
        cy.wait(3000)
    })
})
