Cypress.Commands.add("api_addNewPetToStore", (body) => {
    cy.request({
        method: 'POST',
        url: `https://petstore.swagger.io/v2/pet`,
        headers: {
            'accept': 'application/json'
        },
        body: body,
        failOnStatusCode: false
    })
})

Cypress.Commands.add("api_findPetById", () => {
    cy.request({
        method: 'GET',
        url: `https://petstore.swagger.io/v2/pet/9223372016900011948`,
    })
})