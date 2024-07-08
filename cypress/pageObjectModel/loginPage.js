class Login{
    textUsername = "#user-name";
    textPassword = "#password";
    submitForm = "#login-button";
    verifyPage = ".title";
    sidebar = "#logout_sidebar_link"
    logout = "#logout_sidebar_link"


    setUsername(username) {
        cy.get(this.textUsername).type(username)
    }

    setPassword(password) {
        cy.get(this.textPassword).type(password)
    }

    clickSubmit() {
        cy.get(this.submitForm).click()

    }

    verifyLogin(){
        cy.get(this.verifyPage).should('have.text', 'Products')
    }

    clickSidebar(){
        cy.get(this.sidebar).click()
    }

    clicklogout(){
        cy.get(this.logout).click({force: true});
    }

}

export default Login;