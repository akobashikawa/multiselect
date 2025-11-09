describe('Counter App E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the page correctly', () => {
    cy.contains('Contador TDD').should('be.visible');
    cy.get('[data-testid="counter-display"]').should('contain', '0');
  });

  it('should increment counter when increment button is clicked', () => {
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '1');
    
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '2');
  });

  it('should decrement counter when decrement button is clicked', () => {
    // Primero incrementar para tener un valor positivo
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '1');
    
    // Luego decrementar
    cy.get('[data-testid="decrement-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '0');
  });

  it('should handle negative values', () => {
    cy.get('[data-testid="decrement-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '-1');
    
    cy.get('[data-testid="decrement-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '-2');
  });

  it('should reset counter to 0', () => {
    // Incrementar varias veces
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '3');
    
    // Reset
    cy.get('[data-testid="reset-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '0');
  });

  it('should show appropriate messages based on counter value', () => {
    // Incrementar para obtener mensaje
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="message"]').should('contain', 'Contador: 1');
    
    // Incrementar muchas veces para mensaje de número alto
    for (let i = 0; i < 10; i++) {
      cy.get('[data-testid="increment-btn"]').click();
    }
    cy.get('[data-testid="message"]').should('contain', '¡Wow! Número alto 🚀');
    
    // Reset y decrementar para mensaje de número bajo
    cy.get('[data-testid="reset-btn"]').click();
    for (let i = 0; i < 6; i++) {
      cy.get('[data-testid="decrement-btn"]').click();
    }
    cy.get('[data-testid="message"]').should('contain', 'Número muy bajo 📉');
  });

  it('should have proper styling and layout', () => {
    // Verificar que los elementos tienen las clases CSS correctas
    cy.get('[data-testid="increment-btn"]').should('have.class', 'btn-increment');
    cy.get('[data-testid="decrement-btn"]').should('have.class', 'btn-decrement');
    cy.get('[data-testid="reset-btn"]').should('have.class', 'btn-reset');
    
    // Verificar que el contador es visible y centrado
    cy.get('[data-testid="counter-display"]').should('be.visible');
    cy.get('.counter-section').should('be.visible');
  });

  it('should be responsive and accessible', () => {
    // Verificar viewport móvil
    cy.viewport(375, 667);
    cy.get('[data-testid="counter-display"]').should('be.visible');
    cy.get('[data-testid="increment-btn"]').should('be.visible');
    
    // Verificar que los botones son clickeables en móvil
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '1');
    
    // Volver a desktop
    cy.viewport(1280, 720);
  });

  it('should handle rapid clicking', () => {
    // Test de stress con clicks rápidos
    for (let i = 0; i < 5; i++) {
      cy.get('[data-testid="increment-btn"]').click();
    }
    cy.get('[data-testid="counter-display"]').should('contain', '5');
    
    for (let i = 0; i < 3; i++) {
      cy.get('[data-testid="decrement-btn"]').click();
    }
    cy.get('[data-testid="counter-display"]').should('contain', '2');
  });
});
