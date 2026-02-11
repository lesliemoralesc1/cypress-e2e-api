import 'cypress-axe'

describe('Pruebas de Accesibilidad en Free Range Testers', () => {

    it('Valida que no existan violaciones de accesibilidad en la página principal', () => {
        cy.visit('https://www.freerangetesters.com/')
        cy.injectAxe()
        cy.checkA11y()
    })
})
