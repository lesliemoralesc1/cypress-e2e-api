import { faker } from '@faker-js/faker'

describe('Example Test Suite', () => {

  beforeEach(() => {
    cy.visit('https://www.bon-bonite.com/')
    cy.title().should('include', 'Bon-Bonite')
  })

  it('Register with valid credentials', () => {
    // Generar datos de prueba utilizando Faker
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email({ firstName, lastName }).toLowerCase()
    const username = faker.string.numeric(7)
    const password = faker.internet.password({ length: 12, memorable: false }) + 'A1!'
    // Guardar las credenciales generadas en variables de entorno para usarlas en el siguiente test
    Cypress.env('registeredUser', username)
    Cypress.env('registeredPass', password)
    // Abrir el menú de cuenta y seleccionar "Registrarse"
    cy.get('#toggle-account-menu-mobile > .hover\\:opacity-70 > svg').click()
    cy.get('#show_register').click()
    cy.log('Datos de registro generados:', { username, password, email })
    // Completar el formulario de registro con los datos generados

    cy.get('#reg_username').type(username).log('Username ingresado:', username)
    cy.get('#first_name').type(firstName).log('First name ingresado:', firstName)
    cy.get('#last_name').type(lastName).log('Last name ingresado:', lastName)
    cy.get('#reg_email').type(email).log('Email ingresado:', email)
    cy.get('#reg_password').type(password).log('Password ingresado:', password)
    cy.get('#reg_password2').type(password).log('Confirm password ingresado:', password)
    // Aceptar términos y condiciones
    cy.get('#privacy_policy_reg').should('be.visible').click().log('Términos y condiciones aceptados')
    cy.get(':nth-child(8) > .uppercase').should('be.visible').click().log('Formulario de registro enviado')
    // Verificar que el registro fue exitoso
    cy.get('.mt-4').should('contain', 'Nos encanta tenerte aquí').click().log('Registro exitoso, mensaje de bienvenida mostrado')
  })

  it('Login with registered user', () => {
    cy.get('#toggle-account-menu-mobile > .hover\\:opacity-70 > svg').click()
    // Datos de prueba
    const savedUser = Cypress.env('registeredUser')
    const savedPass = Cypress.env('registeredPass')
    // Iniciar sesión con las credenciales guardadas
    cy.get('#username').type(savedUser).log('Username ingresado:', savedUser)
    cy.get('#password').type(savedPass).log('Password ingresado:', savedPass)
    cy.get('.gap-6 > :nth-child(3) > .uppercase').should('be.visible').click().log('Formulario de login enviado')
    cy.get('.mt-4').should('contain', 'Nos encanta tenerte aquí').click().log('Login exitoso, mensaje de bienvenida mostrado')
    // Cerrar sesión
    cy.get('#toggle-account-menu-mobile > .cursor-pointer').click().log('Menú de cuenta abierto para cerrar sesión')
    cy.get('#header-account-menu-mobile > .border-t > .uppercase').click().log('Sesión cerrada')
  })

  it('Login with valid credentials 1', () => {
    cy.get('#toggle-account-menu-mobile > .hover\\:opacity-70 > svg').click()
    // Datos de prueba
    cy.get('#username').type('1122345').log('Username ingresado: 1122345')
    cy.get('#password').type('Password123!').log('Password ingresado: Password123!')
    cy.get('.gap-6 > :nth-child(3) > .uppercase').should('be.visible').click().log('Formulario de login enviado')
    cy.get('.mt-4').should('contain', 'Nos encanta tenerte aquí').click().log('Login exitoso, mensaje de bienvenida mostrado')
    // Cerrar sesión
    cy.get('#toggle-account-menu-mobile > .cursor-pointer').click().log('Menú de cuenta abierto para cerrar sesión')
    cy.get('#header-account-menu-mobile > .border-t > .uppercase').click().log('Sesión cerrada')
  })

})