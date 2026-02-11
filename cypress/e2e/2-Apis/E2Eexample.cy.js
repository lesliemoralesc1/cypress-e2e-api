describe('Loguear - Basic Auth y Auth con forms', function () {

    it('Sin loguear', function () {
        cy.visit('https://the-internet.herokuapp.com/basic_auth')

        cy.contains('p').should('contain.text', 'Congratulations! You must have the proper credentials.').should('be.visible')
    })
    it('Loguear con basic auth usando auth de cypress', function () {
        cy.visit('https://the-internet.herokuapp.com/basic_auth', {
            auth: {
                username: 'admin',
                password: 'admin'
            }
        })
        cy.contains('p').should('contain.text', 'Congratulations! You must have the proper credentials.').should('be.visible')
    })
    it('Loguea con las credeciales en la URL', () => {
        //una forma de loguear es pasando las credenciales en la URL, con el formato: https://username:password@url
        //no es recomendado usar esta forma de loguear, ya que las credenciales quedan expuestas en la URL y pueden ser vistas por terceros
        cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth')
        cy.contains('p').should('contain.text', 'Congratulations! You must have the proper credentials.').should('be.visible')
    })
    it('Loguear con un formulario usando un request de tipo POST', () => {
        cy.visit('https://the-internet.herokuapp.com')
        //Datos de prueba
        cy.request({
            method: 'POST',
            url: '/authenticate',
            form: true,
            body: {
                username: 'tomsmith',
                password: 'SuperSecretPassword!',
            }
        })
        cy.getCookie('rack.session').should('exist')
        cy.visit('https://the-internet.herokuapp.com/secure')
        cy.get('.subheader').should('contain.text', 'Welcome to the Secure Area.')
    })

    it('Loguear con un formulario usando un request de tipo POST y una custom command', () => {
        cy.login()
        cy.get('.subheader').should('contain.text', 'Welcome to the Secure Area.')
    })
})