const testData = require('../../fixtures/titles.json')

testData.forEach((testData) => {
    describe('El titulo es correcto para cada subpagina en Free Range Testers', () => {
        it('Valida que ' + testData.Title + ' sea el titulo de ' + testData.Location, () => {
            cy.visit(testData.Location)
            cy.title().should('include', testData.Title)
        })
    })
})