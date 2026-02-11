describe('Ejemplo de uso de fixtures en Cypress', () => {
    before(function () {
        cy.visit('https://the-internet.herokuapp.com/login')
        cy.fixture('credencials').then(function(testdata)  {
            this.testdata = testdata
        })
    })

    it('Login con credenciales de fixture',function() {
        cy.get('#username').type(this.testdata.username)
        cy.get('#password').type(this.testdata.password)
        cy.get('button').contains('Login').click()
        cy.url().should('include', '/secure')
    })
})