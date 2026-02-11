// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
Cypress.on('uncaught:exception', (err, runnable) => {
  // evita que Cypress falle por errores JS del sitio
  return false
})
require('cypress-xpath')

module.exports = (on, config) => {
  on('task', {
    logMessage (message) {
      console.log(message);
      return null;
    },
    calculateSum (a, b) {
      return a + b;
    }
  });
};

// Alternatively you can use CommonJS syntax:
// require('./commands')