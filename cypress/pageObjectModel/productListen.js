class ProductListing {
    constructor() {
        this.selectors = {
            listing: ".inventory_item_img",
            productVerification: ".inventory_item_description",
            productName: "[data-test='inventory-item-name']",
            productPrice: ".inventory_item_price",
            addCartButton: ".btn_inventory"
        };
    }

    confirmList() {
        cy.get(this.selectors.listing).should('have.length.greaterThan', 0);
    }

    confirmProductVerification() {
        cy.get(this.selectors.productVerification).each(($el) => {
            cy.wrap($el).within(() => {
                cy.get(this.selectors.productName).should('be.visible');
                cy.get(this.selectors.productPrice).should('be.visible');
                cy.get(this.selectors.addCartButton).should('be.visible');
            });
        });
    }

    addProductToCart(productName) {
        cy.get(this.selectors.productVerification).contains(productName).parents(this.selectors.productVerification).within(() => {
            cy.get(this.selectors.addCartButton).click();
        });
    }

    verifyProductInCart(productName) {
        cy.get('.shopping_cart_link').click();
        cy.get('.cart_item').should('contain.text', productName);
    }
}

export default ProductListing;
