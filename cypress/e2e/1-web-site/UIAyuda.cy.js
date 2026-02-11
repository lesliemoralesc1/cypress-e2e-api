describe('Utilidades de Ayuda en Cypress', () => {
    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.com')
    })

    it('Ejemplo de esperas implicitas', () => {
        cy.wait(2000) //espera implicita de 2 segundos
        cy.contains('Challenging DOM').click()
    })

    it('Nueva pesta en el navegador', () => {
        cy.contains('Multiple Windows').click()
        cy.log('Hace click en el enlace Click Here que abre una nueva pestaña')
        cy.contains('Click Here').invoke('removeAttr', 'target').click() //elimina el atributo target para abrir en la misma pestaña
        cy.log('Verifica que el nuevo contenido se muestra en la misma pestaña')
        cy.contains('New Window').should('have.text', 'New Window')
    })

    it('Shadow DOM', () => {
        cy.contains('Shadow DOM').click()
        cy.get('ul > :nth-child(2)').shadow.should('have.text', 'In a list!')
    })

    it('Primer y ultimo elemento de una lista', () => {
        cy.contains('Dynamic Content').click()
        cy.get('#content > .row').first().should('be.visible')
        cy.get('#content > .row').last().should('be.visible')
        cy.get('#content > .row').eq(1).find('img').should('be.visible')
    })

    it('Padres e hijos', () => {
        cy.contains('Dynamic Content').click()
        cy.get(':nth-child(1) > .large-2 > img').parent()
        cy.get('.example > :nth-child(7)').children()
    })

    it('Invoke', () => {
        cy.contains('Dynamic Content')
            .should('be.hidden')
            .invoke('show')
            .should('be.visible')
    })
})