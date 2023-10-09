//import { loginPage } from "../../pages/loginPagle"
import loginPage from "../../pages/loginPage"
import inventoryPage from "../../pages/inventoryPage"
import cartPage from "../../pages/cartPage"
import checkoutPage from "../../pages/checkoutPage"


describe('UI test challenge', () => {

    //let user = 'standard_user'
    //let pass = 'secret_sauce'

    before(() => {
        //cy.wrap(Cypress.state('activeSessions', {}));
        cy.wrap(Cypress.session.clearAllSavedSessions());
    })
    beforeEach(() => {
        //Setting desktop view port
        cy.setViewPort_Desktop()

        //login and store session
        loginPage.userlogin('standard_user', 'secret_sauce')

    })

    it("User is able to see 6 items listed by default", () => {
        cy.visit('/inventory.html', { failOnStatusCode: false })

        //Verifying number of displayed items
        inventoryPage.getInventoryListCount(6)
    });

    it("Verify user can sort the inventory items by price, high-to-low, and the sorting is correct.", () => {
        cy.visit('/inventory.html', { failOnStatusCode: false })

        //Sort items by price
        inventoryPage.selectSortingOption('Price (high to low)')

        //Verify items are sorted high to low
        inventoryPage.getItemPrice(1, '$49.99')
        inventoryPage.getItemPrice(2, '$29.99')
        inventoryPage.getItemPrice(3, '$15.99')
        inventoryPage.getItemPrice(4, '$15.99')
        inventoryPage.getItemPrice(5, '$9.99')
        inventoryPage.getItemPrice(6, '$7.99')

    });

    it("User is able to add more than one item to cart and complete purchase", () => {
        cy.visit('/inventory.html', { failOnStatusCode: false })
        cy.contains('Products').should('be.visible')

        //Selecting items from grid - by product name
        inventoryPage.selectItem_byProductName('Sauce Labs Backpack')
        inventoryPage.selectItem_byProductName('Sauce Labs Bolt T-Shirt')
        inventoryPage.selectItem_byProductName('Test.allTheThings() T-Shirt (Red)')

        //Verify shopping cart icon is showing expected number of items
        inventoryPage.getCartCount(3)
        inventoryPage.goToCart()

        //Verify item is visible on cart page
        cartPage.getTotalItemsOnCart(3)
        cartPage.goToCheckout()

        //Fill checkout personal info
        //parameters: first name, last name, postal code
        checkoutPage.fillCheckoutInfo('Juan', 'Aviles', '1234')
        checkoutPage.clickOnContinuePurchase()

        //Verify total price is the expected
        checkoutPage.verifyTotalPrice('$66.93')
        checkoutPage.finishPurchase()

        //Verify user is able to see thank you label
        cy.contains('Thank you for your order!').should('be.visible')
    })

})
