class AddToCart{
    constructor(){
        this.selectors = {
            cartAdding: "button#add-to-cart-sauce-labs-backpack",
            addToCartLink: "[data-test='shopping-cart-link']",
            removeButton: "[name='remove-sauce-labs-backpack']",
            checkOutLink: "button#checkout",
            fname: "input#first-name",
            lname: "input#last-name",
            pCode: "input#postal-code",
            continue: "input#continue",
            // button#add-to-cart-sauce-labs-bike-light
            // [data-test='shopping-cart-badge']
        }
    }

    addItemToCart(expectedCount){
       cy.get(this.selectors.cartAdding).click(); 
    //    cy.get(this.selectors.addToCartLink).eq(0).click()
    //    cy.get(this.selectors.addToCartLink).eq(1).click()
    //    cy.get(this.selectors.addToCartLink).eq(2).click()
       cy.get(this.selectors.addToCartLink).should('contain.text', expectedCount)

    
       
    }

    removeButtonFromCart(){
        cy.get(this.selectors.removeButton).should('have.text', 'Remove')
    }

   cartButtonLink(){
    cy.get(this.selectors.addToCartLink).click()
   }

   addToCartNavigation(){
    cy.get(this.selectors.addToCartLink).click();
    cy.get(this.selectors.checkOutLink).click();
    cy.get(this.selectors.fname).type('Olamide');
    cy.get(this.selectors.lname).type('Mike');
    cy.get(this.selectors.pCode).type('12345');
    cy.get(this.selectors.continue).click();
    cy.url().should('include', 'checkout-step-two.html');


   }
}

export default AddToCart;