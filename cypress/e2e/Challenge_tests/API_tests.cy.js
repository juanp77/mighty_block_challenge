/// <reference types="Cypress" />

describe("API test - Challenge - Everything about your Pets", () => {


    it("POST - Add a new pet to the store", () => {
        cy.fixture('api_add_new_pet_to_store').then((userData) => {
            cy.api_addNewPetToStore(userData.body).then((response) => {
                console.log(JSON.stringify(response))
                expect(response.status).to.eq(200)
                expect(response.body.id).not.null
                expect(response.body.name).to.eq('doggie from api test')
                expect(response.isOkStatusCode).to.eq(true)

                const petId = response.body.id
                Cypress.env('petId', petId)
            })
        })
    })

    it("GET - Find pet by ID", () => {
        //Find pet
        cy.api_findPetById(petId).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.eq(petId)
            expect(response.body.name).to.eq('doggie from api test')
            expect(response.body.status).to.eq('available')
        })
    })
})