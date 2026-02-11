describe('Utilidades para depuracion con Cypress', () => {
    it('Uso de .log()', () => {
        cy.visit('https://the-internet.herokuapp.com')
        cy.log('Hace click en el enlace de Form Authentication')
        cy.get('a[href="/login"]').click()
        cy.log('Ingresa el usuario')
        cy.get('#username').type('tomsmith')
        cy.log('Ingresa la contrasena')
        cy.get('#password').type('SuperSecretPassword!')
        cy.log('Hace click en el boton de Login')
        cy.get('button').contains('Login').click()
        cy.log('Verifica que la URL contenga /secure')
        cy.url().should('include', '/secure')
    })

    it('Uso de .pause()', () => {
        cy.visit('https://the-internet.herokuapp.com')
        cy.get('a[href="/login"]').click()
        cy.get('#username').type('tomsmith').pause()
        cy.get('#password').pause().type('SuperSecretPassword!')
        cy.get('button').contains('Login').click()
        cy.url().should('include', '/secure').pause()
    })

    it('Uso de .debug()', () => {
        cy.visit('https://the-internet.herokuapp.com')
        cy.get('a[href="/login"]').click()
        cy.get('#username').type('tomsmith')
        cy.get('#password').debug().type('SuperSecretPassword!')
        cy.get('button').contains('Login').click()
        cy.url().should('include', '/secure')
    })
})