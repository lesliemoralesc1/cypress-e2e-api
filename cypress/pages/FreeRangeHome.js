import { de } from "@faker-js/faker"

class FreeRangeHome {
    //actions
    navigateToHome() {
        cy.visit('https://www.freerangetesters.com/')
    }
    //locators
    empezarButton() {
        return cy.contains('.sc-dJkDXt.kgRdEL','Ver plan de carrera')
    }
}
export default FreeRangeHome;
