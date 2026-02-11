import FreeRangeHome from "../../pages/FreeRangeHome"
const home = new FreeRangeHome()
describe('Ejemplo de POM en la web Free Range Testers', () => {
    beforeEach(() => {
        home.navigateToHome()
    })

    it('El boton "Empezar a Aprender", existe', () => {
        home.empezarButton().should('exist')
    })

})