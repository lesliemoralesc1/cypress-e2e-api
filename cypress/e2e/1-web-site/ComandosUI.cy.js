describe('Utilidades de Ayuda en Cypress', () => {
    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.com')
    })

    it('Ejemplo de click', () => {
        cy.contains('Add/Remove Elements').click()
        cy.get('button').contains('Add Element').click()
        cy.get('.added-manually').contains('Delete').should('be.visible').click()
    })

    it('Ejemplo de checkbox', () => {
        cy.contains('Checkboxes').click()
        cy.get('#checkboxes input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('#checkboxes input[type="checkbox"]').eq(1).uncheck().should('not.be.checked')
    })

    it('Ejemplo de escritura de texto', () => {
        cy.contains('Form Authentication').click()
        cy.get('#username').type('tomsmith')
        cy.get('#password').type('SuperSecretPassword!')
        cy.get('#password').clear()
        cy.get('button').contains('Login').click()
    })

    it('Ejemplo de dropdown', () => {
        cy.contains('Dropdown').click()
        cy.get('#dropdown').select('Option 2').should('have.value', '2')
    })

    it('Ejemplo de hover', () => {
        cy.contains('Hovers').click()
        cy.contains('h5', 'user1')
            .closest('.figure')
            .find('.figcaption')
            .invoke('show')   // fuerza visibilidad
            .find('a', 'View profile')
            .should('be.visible')
            .click()
    })

    it('Click derecho', () => {
        cy.contains('Context Menu').click()
        cy.get('#hot-spot').rightclick()
        cy.on('window:alert', (alert) => {
            expect(alert).to.equal('You selected a context menu')
        })
    })

    it('Ejemplo de alertas', () => {
        cy.contains('JavaScript Alerts').click()
        cy.contains('button', 'Click for JS Alert').click()
        cy.on('window:alert', (alert) => {
            expect(alert).to.equal('I am a JS Alert')
        })
    })

    it('Ejemplo de alertas confirm - cancelar', () => {
        cy.contains('JavaScript Alerts').click()
        cy.contains('button', 'Click for JS Confirm').click()
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('I am a JS Confirm')
            return false // para cancelar la alerta
        })
        cy.get('#result').should('have.text', 'You clicked: Cancel')
    })

    it('Ejemplo de alertas confirm - aceptar', () => {
        cy.contains('JavaScript Alerts').click()
        cy.contains('button', 'Click for JS Confirm').click()
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('I am a JS Confirm')
            return true // para aceptar la alerta
        })
        cy.get('#result').should('have.text', 'You clicked: Ok')
    })
})