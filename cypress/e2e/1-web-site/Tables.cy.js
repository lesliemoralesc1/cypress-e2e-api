describe('tablas estaticas y dinamicas', () => {

    it('Validamos texto en una tabla estatica', function () {
        cy.visit('https://assertqa.com/practice/webtables')
        cy.get('#employees-table > tbody > tr > td:nth-child(2)').each(($el, index, $list) => {
            //Obtiene el texto del elemento actual de la columna de nombre
            const text = $el.text()
            if (text === 'Sarah') {
                //Si el texto es 'John', obtiene el siguiente elemento td (que contiene el email)
                cy.get('#employees-table > tbody > tr > td:nth-child(4)').eq(index).then((function (p) {
                    //Obtiene el texto del elemento td que contiene el email
                    const email = p.text()
                    //Verifica que el email sea '
                    expect(email).to.equal('sarah.j@company.com')
                }))
                cy.get('#employees-table > tbody > tr > td:nth-child(6)').eq(index).then((function (p) {
                    //Obtiene el texto del elemento td que contiene el salario
                    const salary = p.text()
                    //Verifica que el salario sea '
                    expect(salary).to.equal('$65,000')
                }))
            }
        })
    })

    it('Validamos texto en una tabla estatica 2', function () {
        cy.visit('https://assertqa.com/practice/webtables')
        //Busca la fila que contiene el texto 'Selenium Framework' y hace click en el enlace de esa fila
        cy.contains('tr', 'Sarah').find('td:nth-child(4)').should('have.text', 'sarah.j@company.com')
        cy.contains('tr', 'Sarah').find('td:nth-child(6)').should('have.text', '$65,000')

    })

    it('Validamos texto en una tabla dinamica', function () {
        cy.visit('https://practicetestautomation.com/practice-test-table/?utm_source=chatgpt.com')
        //Busca la fila que contiene el texto 'Selenium Framework'
        cy.contains('tr', 'Selenium Framework').find('td:nth-child(6) a')
        //Verifica que el enlace tenga el texto 'View' y el atributo href correcto, luego hace click en el enlace
            .should('contain.text', 'View')
            .and('have.attr', 'href',
                'https://practicetestautomation.com/selenium-webdriver-test-framework-from-scratch-referralCode').invoke('removeAttr', 'target').click()
    })

})