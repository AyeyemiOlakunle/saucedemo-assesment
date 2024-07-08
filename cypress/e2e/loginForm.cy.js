///<reference types="cypress-xpath" />

import Login from "../pageObjectModel/loginPage";
import ProductListing from "../pageObjectModel/productListen";
import ProductSorting from "../pageObjectModel/productSorting";
import AddToCart from "../pageObjectModel/addToCart";

describe('A test to login in into saucedemo website', () => {
  // beforeEach(()=>{
       
  // })
  it('should be able to login after filling the forms on the login page   ', () => {
    cy.visit('www.saucedemo.com')

    const pageLogin = new Login();
    pageLogin.setUsername("standard_user");
    pageLogin.setPassword("secret_sauce");
    pageLogin.clickSubmit();
    pageLogin.verifyLogin()

    //verify the url

    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    
    pageLogin.clicklogout({force: true})
  })


  it('should be able to login after filling the forms on the login page   ', () => {
    cy.visit('www.saucedemo.com')

    const pageLogin = new Login();
    const listingPage = new ProductListing();


    pageLogin.setUsername("standard_user");
    pageLogin.setPassword("secret_sauce");
    pageLogin.clickSubmit();
  
    // pageLogin.verifyLogin()

    listingPage.confirmList();
    listingPage.confirmProductVerification();
    
  })

  it.only('product sorting assertion and Calculate and log all the prices of the items in ascending order.  ', () => {
    cy.visit('www.saucedemo.com')

    const pageLogin = new Login();
    const listingPage = new ProductListing();
    const sorting = new ProductSorting();


    pageLogin.setUsername("standard_user");
    pageLogin.setPassword("secret_sauce");
    pageLogin.clickSubmit();
  
    // pageLogin.verifyLogin()
    sorting.confirmProductSorting();
    sorting.priceAssendingOrder();
    
    
    
  })

  it('verifying if product is added to cart successfully  ', () => {
    cy.visit('www.saucedemo.com')

    const pageLogin = new Login();
    const listingPage = new ProductListing();
    const sorting = new ProductSorting();
    const cartUpdate = new AddToCart()


    pageLogin.setUsername("standard_user");
    pageLogin.setPassword("secret_sauce");
    pageLogin.clickSubmit();
    cartUpdate.addItemToCart(1);
    
    cartUpdate.removeButtonFromCart();
    cy.get("[name='add-to-cart-sauce-labs-bike-light']").click();
    cy.get("[data-test='shopping-cart-badge']").should('contain.text', '2');
    
    cy.get("[name='add-to-cart-sauce-labs-bolt-t-shirt']").click();
    cy.get("[data-test='shopping-cart-link']").should('contain.text', '3');


    //Cart Overview Assertion 
    //Navigating to cart item page
    cartUpdate.cartButtonLink();
    cartUpdate.addToCartNavigation();
    
  
    
    // .cart_list .cart_item
    cy.get(".cart_list .cart_item").eq(0).invoke('text').as('item_carted')
    cy.get('@item_carted').its('length').should('be.gt', 2)
    cy.get("button#finish").click();
    cy.get('div#checkout_complete_container > .complete-header').should('have.text', 'Thank you for your order!')

  
    
    
  })

})

