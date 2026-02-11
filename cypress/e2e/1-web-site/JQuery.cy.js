describe('Utilidades de Ayuda en Cypress', () => {
    it('Uso de $.each() para iterar sobre un array', () => {
        $.each([1, 2, 3], (index, value) => {
            //Imprime el índice y el valor de cada elemento del array
            cy.log('Índice: ' + index + ', Valor: ' + value)
            //Verifica que el valor sea igual al índice + 1
            expect(value).to.equal(index + 1)
        })
    })

    it('Uso de $.map() para transformar un array', () => {
        const numbers = [1, 2, 3]
        const squaredNumbers = $.map(numbers, (value) => {
            //Devuelve el valor al cuadrado
            return value * value
        })
        //Verifica que el array resultante sea [1, 4, 9]
        expect(squaredNumbers).to.deep.equal([1, 4, 9])
    })

    it('Uso de $.grep() para filtrar un array', () => {
        const numbers = [1, 2, 3, 4, 5]
        const evenNumbers = $.grep(numbers, (value) => {
            //Devuelve true si el valor es par
            return value % 2 === 0
        })
        //Verifica que el array resultante sea [2, 4]
        expect(evenNumbers).to.deep.equal([2, 4])
    })
})