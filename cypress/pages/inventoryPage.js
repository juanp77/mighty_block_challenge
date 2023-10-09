/// <reference types="cypress" />

class inventoryPage {
    locators = {
        inventoryContainer: () => cy.get('.inventory_container'),
        inventoryList: () => cy.get('.inventory_list'),

        itemName: () => cy.get('.inventory_item_name'),
        addToCartBtn: () => `[data-test="add-to-cart-sauce-labs-backpack"]`,
        removeFromCardBtn: () => cy.get(`[data-test="remove-sauce-labs-backpack"]`),

        cartLinkBtn: () => cy.get('.shopping_cart_link'),
        cartItemsCount: () => cy.get('.shopping_cart_badge')

    }

    filterLocators = {
        productSortContainer: () => cy.get(`[data-test="product_sort_container"]`)
    }

    //Functions

    getItemPrice(itemPosition, price) {
        itemPosition = itemPosition - 1
        //item position
        this.locators.inventoryContainer().should('be.visible').then(() => {
            cy.get('.inventory_item').eq(itemPosition).then(($card) => {
                cy.get($card).find('.inventory_item_price').should('have.text', price)
            })
        })
    }

    getInventoryListCount(items) {
        this.locators.inventoryContainer().should('be.visible').then(() => {
            this.locators.inventoryList().find('.inventory_item').should('have.length', items)
        })
    }

    selectItem_byProductName(productName) {
        //item number associated to card
        this.locators.inventoryContainer().should('be.visible').then(() => {
            this.locators.itemName().contains(productName).parents('.inventory_item').then(($card) => {
                cy.get($card).find('.btn').contains('Add to cart').click()
            })
            this.locators.removeFromCardBtn().should('have.text', 'Remove')
        })

    }

    getCartCount(totalItems) {
        this.locators.cartItemsCount().should('have.text', totalItems)
    }

    goToCart() {
        this.locators.cartLinkBtn().click().wait(1000)
        cy.url().should('include', 'cart')
    }

    //Sorting functions
    selectSortingOption(option) {
        this.filterLocators.productSortContainer().should('be.visible').select(option)
    }


}

module.exports = new inventoryPage()