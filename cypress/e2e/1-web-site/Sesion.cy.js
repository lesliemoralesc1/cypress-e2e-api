describe('Utilidedes de sesiones y cookies en press', () => {

    it('Sin sesion guardada', () => {
        cy.visit('https://the-internet.herokuapp.com')
        cy.contains('Form Authentication').click()
        cy.get('#username').type('tomsmith')
        cy.get('#password').type('SuperSecretPassword!')
        cy.get('button').contains('Login').click()
        cy.url().should('include', '/secure')
    })
    it('Con sesion guardada Tom', () => {
        // Guarda la sesión actual con el nombre 'loginSession Tom'
        cy.session('Tom', () => {
            cy.visit('https://the-internet.herokuapp.com')
            cy.contains('Form Authentication').click()
            cy.get('#username').type('tomsmith')
            cy.get('#password').type('SuperSecretPassword!')
            cy.get('button').contains('Login').click()
            cy.url().should('include', '/secure')
        })
    })

    it('Example getCookies', () => {
        // Guarda la sesión actual con el nombre 'loginSession Tom'
        cy.session('Tom 2', () => {
            cy.visit('https://the-internet.herokuapp.com')
            cy.contains('Form Authentication').click()
            cy.get('#username').type('tomsmith')
            cy.get('#password').type('SuperSecretPassword!')
            cy.get('button').contains('Login').click()
            cy.url().should('include', '/secure')
            cy.getCookies().should('have.length', 5).then((cookies) => {
                expect(cookies[0]).to.have.property('name', 'optimizelyPendingLogEvents')
            })
        })
        cy.clearCookies()
        cy.getCookies().should('have.length', 0)
    })

    it('Example getCookie', () => {
        // Guarda la sesión actual con el nombre 'loginSession Tom'
        cy.session('Tom 3', () => {
            cy.visit('https://the-internet.herokuapp.com')
            cy.contains('Form Authentication').click()
            cy.get('#username').type('tomsmith')
            cy.get('#password').type('SuperSecretPassword!')
            cy.get('button').contains('Login').click()
            cy.url().should('include', '/secure')
            cy.getCookie('optimizelyPendingLogEvents').should('exist')
            cy.getCookie('optimizelyPendingLogEvents').should('not.have.property', 'value', '%5B%22n%3Dhttps%253A%252F%252Fthe-internet.herokuapp.com%252Fsecure%26u%3Doeu1770583656370r0.8088073244450787%26wxhr%3Dtrue%26t%3D1770583657397%26f%3D298349752%2C318188263%22%2C%22n%3Dengagement%26g%3D298283957%26u%3Doeu1770583656370r0.8088073244450787%26wxhr%3Dtrue%26t%3D1770583656563%26f%3D298349752%2C318188263%22%2C%22n%3Dhttps%253A%252F%252F')
            cy.clearCookies('optimizelyPendingLogEvents')
            cy.getCookie('optimizelyPendingLogEvents').should('not.exist')
        })
    })

    it('Setear cookie', () => {
        cy.visit('https://the-internet.herokuapp.com')
        cy.contains('Form Authentication').click()
        cy.get('#username').type('tomsmith')
        cy.get('#password').type('SuperSecretPassword!')
        cy.get('button').contains('Login').click()
        cy.url().should('include', '/secure')
        cy.getCookie('miCookiePersonalizada').should('not.exist')
        cy.setCookie('miCookiePersonalizada', 'valorDeMiCookie')
        cy.getCookie('miCookiePersonalizada').should('have.property', 'value', 'valorDeMiCookie')
    })

})  