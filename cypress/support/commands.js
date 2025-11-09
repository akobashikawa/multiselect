// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comandos personalizados para testing del contador
Cypress.Commands.add('visitApp', () => {
  cy.visit('/');
  cy.get('[data-testid="counter-display"]').should('be.visible');
});

Cypress.Commands.add('getCounter', () => {
  return cy.get('[data-testid="counter-display"]');
});

Cypress.Commands.add('getIncrementBtn', () => {
  return cy.get('[data-testid="increment-btn"]');
});

Cypress.Commands.add('getDecrementBtn', () => {
  return cy.get('[data-testid="decrement-btn"]');
});

Cypress.Commands.add('getResetBtn', () => {
  return cy.get('[data-testid="reset-btn"]');
});

Cypress.Commands.add('getMessage', () => {
  return cy.get('[data-testid="message"]');
});

// Comando para verificar el estado completo del contador
Cypress.Commands.add('verifyCounterState', (expectedCount, expectedMessage = '') => {
  cy.getCounter().should('contain', expectedCount.toString());
  if (expectedMessage) {
    cy.getMessage().should('contain', expectedMessage);
  }
});
