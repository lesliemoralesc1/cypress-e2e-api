describe('IFrame Testing in Cypress', () => {

    it('Validar el texto de un elemento dentro de un iframe', () => {
        cy.visit('https://webdriveruniversity.com/IFrame/index.html')
        cy.get('#frame')
        .iframe('body #button-find-out-more > b').should('have.text', 'Find Out More!')
    })
})