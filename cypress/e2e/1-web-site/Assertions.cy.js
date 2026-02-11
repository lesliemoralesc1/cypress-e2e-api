describe('Validaciones implicitas y explicitas', () => {
    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.com')
    })

    it('Validacion implicita', () => {
        cy.contains('Inputs').click()
        cy.get('h3').should('have.text', 'Inputs')
        cy.get('.example').should('have.class', 'example')
            .and('be.visible')
    })

    it('Validacion explicita', () => {
        cy.contains('Inputs').click()
        cy.get('h3')
        expect('Inputs').to.equal('Inputs')
    })

    it('Espera que las promesas se resuelvan', () => {
        let waited = false
        function waitOneSecond() {
            //Devuelve una promesa que se resuelve después de 1 segundo
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    waited = true
                    resolve('Esperado')
                }, 1000)
            })
        }
        cy.wrap(waitOneSecond()).then(() => {
            //Devuelve una promesa a cy.then() que se resuelve cuando waitOneSecond() se resuelve
            return waitOneSecond().then((result) => {
                //Verifica que el resultado de waitOneSecond() sea 'Esperado'
                expect(result).to.equal('Esperado')
                //Verifica que la variable wait sea true después de que se resuelva la promesa
                expect(waited).to.be.true
            })
        })
    })
})