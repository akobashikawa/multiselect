describe('Counter Component E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the page with counter component correctly', () => {
    cy.contains('Contador TDD').should('be.visible');
    cy.get('[data-testid="counter-display"]').should('contain', '0');
    cy.contains('Template para TDD con Vue CDN + Import Maps').should('be.visible');
  });

  it('should use the counter component and show current value in header', () => {
    // Verificar que inicialmente no se muestra el valor actual
    cy.contains('Valor actual:').should('not.exist');
    
    // Incrementar y verificar que se muestra el valor en el header
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '1');
    cy.contains('Valor actual: 1').should('be.visible');
    
    // Incrementar más y verificar el header se actualiza
    cy.get('[data-testid="increment-btn"]').click();
    cy.contains('Valor actual: 2').should('be.visible');
  });

  it('should increment counter in component when increment button is clicked', () => {
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '1');
    
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '2');
  });

  it('should decrement counter in component when decrement button is clicked', () => {
    // Primero incrementar para tener un valor positivo
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '1');
    
    // Luego decrementar
    cy.get('[data-testid="decrement-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '0');
    
    // Verificar que el header no muestra valor cuando es 0
    cy.contains('Valor actual:').should('not.exist');
  });

  it('should handle negative values in component', () => {
    cy.get('[data-testid="decrement-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '-1');
    cy.contains('Valor actual: -1').should('be.visible');
    
    cy.get('[data-testid="decrement-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '-2');
    cy.contains('Valor actual: -2').should('be.visible');
  });

  it('should reset counter to 0 in component', () => {
    // Incrementar varias veces
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '3');
    cy.contains('Valor actual: 3').should('be.visible');
    
    // Reset
    cy.get('[data-testid="reset-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '0');
    cy.contains('Valor actual:').should('not.exist');
  });

  it('should show appropriate messages from component based on counter value', () => {
    // Incrementar para obtener mensaje
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="message"]').should('contain', 'Contador: 1');
    
    // Incrementar muchas veces para mensaje de número alto
    for (let i = 0; i < 10; i++) {
      cy.get('[data-testid="increment-btn"]').click();
    }
    cy.get('[data-testid="message"]').should('contain', '¡Wow! Número alto 🚀');
    cy.contains('Valor actual: 11').should('be.visible');
    
    // Reset y decrementar para mensaje de número bajo
    cy.get('[data-testid="reset-btn"]').click();
    for (let i = 0; i < 6; i++) {
      cy.get('[data-testid="decrement-btn"]').click();
    }
    cy.get('[data-testid="message"]').should('contain', 'Número muy bajo 📉');
    cy.contains('Valor actual: -6').should('be.visible');
  });

  it('should maintain component styling and layout', () => {
    // Verificar que los elementos tienen las clases CSS correctas
    cy.get('[data-testid="increment-btn"]').should('have.class', 'btn-increment');
    cy.get('[data-testid="decrement-btn"]').should('have.class', 'btn-decrement');
    cy.get('[data-testid="reset-btn"]').should('have.class', 'btn-reset');
    
    // Verificar que el contador es visible y centrado
    cy.get('[data-testid="counter-display"]').should('be.visible');
    cy.get('.counter-section').should('be.visible');
  });

  it('should handle component interaction in responsive design', () => {
    // Verificar viewport móvil
    cy.viewport(375, 667);
    cy.get('[data-testid="counter-display"]').should('be.visible');
    cy.get('[data-testid="increment-btn"]').should('be.visible');
    
    // Verificar que los botones del componente son clickeables en móvil
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '1');
    cy.contains('Valor actual: 1').should('be.visible');
    
    // Volver a desktop
    cy.viewport(1280, 720);
  });

  it('should handle rapid clicking on component', () => {
    // Test de stress con clicks rápidos en el componente
    for (let i = 0; i < 5; i++) {
      cy.get('[data-testid="increment-btn"]').click();
    }
    cy.get('[data-testid="counter-display"]').should('contain', '5');
    cy.contains('Valor actual: 5').should('be.visible');
    
    for (let i = 0; i < 3; i++) {
      cy.get('[data-testid="decrement-btn"]').click();
    }
    cy.get('[data-testid="counter-display"]').should('contain', '2');
    cy.contains('Valor actual: 2').should('be.visible');
  });

  it('should verify component isolation and reusability', () => {
    // El componente debería funcionar independientemente
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="increment-btn"]').click();
    
    // Verificar que tanto el componente como la app padre muestran el mismo valor
    cy.get('[data-testid="counter-display"]').should('contain', '2');
    cy.contains('Valor actual: 2').should('be.visible');
    
    // Reset desde el componente debería afectar ambos
    cy.get('[data-testid="reset-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '0');
    cy.contains('Valor actual:').should('not.exist');
  });
});
