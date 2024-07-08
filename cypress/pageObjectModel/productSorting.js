class ProductSorting{
    constructor(){

        this.selectors = {
            dropdown:" select[data-test='product-sort-container']",
            inventoryItem: ".inventory_item_description" 
        }
        
    }

   confirmProductSorting() {
        cy.get(this.selectors.dropdown).should('contain.text', 'Price (high to low)')
   }


   priceAssendingOrder () {
    let items = []
    let totalPrice = 0;
    cy.get(this.selectors.inventoryItem).each(($el) => {
        cy.log($el)
        const title = $el.find('.inventory_item_name').text()
        cy.log(title)
        const priceText = $el.find('.inventory_item_price').text()
        cy.log(priceText)
        const price = parseFloat(priceText.replace('$', ''))
        cy.log(price)
        totalPrice += price;

        items.push({
            title, price
        })
    }).then(() => {
        items.sort((a, b) => a.price - b.price);
        cy.log("Items sorted in ascending order:");
        items.forEach((item) => {
            cy.log(`Title: ${item.title}, Price: ${item.price}`);
            cy.log('Total Price of goods: ' + totalPrice);
            expect(totalPrice).to.equal(129.94)

        });
       
    });
}

}

export default ProductSorting