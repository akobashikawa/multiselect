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
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Configuración global para los tests E2E
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test on uncaught exceptions
  return false;
});

// Comandos personalizados para este proyecto
Cypress.Commands.add('incrementCounter', (times = 1) => {
  for (let i = 0; i < times; i++) {
    cy.get('[data-testid="increment-btn"]').click();
  }
});

Cypress.Commands.add('decrementCounter', (times = 1) => {
  for (let i = 0; i < times; i++) {
    cy.get('[data-testid="decrement-btn"]').click();
  }
});

Cypress.Commands.add('resetCounter', () => {
  cy.get('[data-testid="reset-btn"]').click();
});

Cypress.Commands.add('checkCounterValue', (expectedValue) => {
  cy.get('[data-testid="counter-display"]').should('contain', expectedValue.toString());
});
