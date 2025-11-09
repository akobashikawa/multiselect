describe('App Component E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the app component correctly', () => {
    // Verificar que el componente App se renderiza
    cy.get('.container').should('be.visible');
    cy.get('.header').should('be.visible');
    
    // Verificar contenido del header
    cy.contains('Contador TDD').should('be.visible');
    cy.contains('Template para TDD con Vue CDN + Import Maps').should('be.visible');
  });

  it('should show minimal HTML structure', () => {
    // Verificar que el HTML base es mínimo
    cy.get('#app').should('exist');
    cy.get('#app .container').should('exist');
    
    // No debería haber contenido hardcodeado en el HTML
    cy.get('body').should('not.contain', 'Contador TDD');
    
    // Todo el contenido debe venir del componente
    cy.get('#app').contains('Contador TDD').should('exist');
  });

  it('should render counter component within app component', () => {
    // Verificar que el counter component está dentro del app
    cy.get('[data-testid="counter-component"]').should('be.visible');
    cy.get('[data-testid="counter-display"]').should('contain', '0');
    
    // Verificar botones del counter
    cy.get('[data-testid="increment-btn"]').should('be.visible');
    cy.get('[data-testid="decrement-btn"]').should('be.visible');
    cy.get('[data-testid="reset-btn"]').should('be.visible');
  });

  it('should show current value in header when counter changes', () => {
    // Inicialmente no debería mostrar valor actual
    cy.get('[data-testid="current-value"]').should('not.exist');
    
    // Incrementar y verificar que aparece el valor en el header
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="current-value"]').should('be.visible');
    cy.get('[data-testid="current-value"]').should('contain', 'Valor actual: 1');
    
    // Incrementar más y verificar actualización
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="current-value"]').should('contain', 'Valor actual: 2');
  });

  it('should hide current value when counter is 0', () => {
    // Incrementar primero
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="current-value"]').should('be.visible');
    
    // Reset y verificar que desaparece
    cy.get('[data-testid="reset-btn"]').click();
    cy.get('[data-testid="current-value"]').should('not.exist');
    
    // Decrementar y verificar que aparece con valor negativo
    cy.get('[data-testid="decrement-btn"]').click();
    cy.get('[data-testid="current-value"]').should('contain', 'Valor actual: -1');
    
    // Incrementar para volver a 0
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="current-value"]').should('not.exist');
  });

  it('should maintain app component styling', () => {
    // Verificar clases CSS del app component
    cy.get('.container').should('have.css', 'max-width');
    cy.get('.header').should('exist');
    cy.get('[data-testid="current-value"]').should('have.class', 'current-value');
  });

  it('should handle component communication correctly', () => {
    // Test de comunicación entre App y Counter components
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="increment-btn"]').click();
    
    // Verificar que tanto el counter como el app muestran el mismo valor
    cy.get('[data-testid="counter-display"]').should('contain', '3');
    cy.get('[data-testid="current-value"]').should('contain', 'Valor actual: 3');
    
    // Test con decrementos
    cy.get('[data-testid="decrement-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '2');
    cy.get('[data-testid="current-value"]').should('contain', 'Valor actual: 2');
    
    // Test con reset
    cy.get('[data-testid="reset-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '0');
    cy.get('[data-testid="current-value"]').should('not.exist');
  });

  it('should work in responsive design', () => {
    // Test en móvil
    cy.viewport(375, 667);
    cy.get('.container').should('be.visible');
    cy.get('[data-testid="counter-component"]').should('be.visible');
    
    // Interacción debe funcionar
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="current-value"]').should('contain', 'Valor actual: 1');
    
    // Volver a desktop
    cy.viewport(1280, 720);
    cy.get('[data-testid="current-value"]').should('contain', 'Valor actual: 1');
  });

  it('should demonstrate component isolation and reusability', () => {
    // El App component actúa como contenedor
    // El Counter component es completamente reutilizable
    
    cy.get('[data-testid="increment-btn"]').click();
    cy.get('[data-testid="increment-btn"]').click();
    
    // App component recibe y muestra la información del Counter
    cy.get('[data-testid="counter-display"]').should('contain', '2');
    cy.get('[data-testid="current-value"]').should('contain', 'Valor actual: 2');
    
    // Si hubiera múltiples counters, el App podría coordinarlos
    cy.get('[data-testid="reset-btn"]').click();
    cy.get('[data-testid="counter-display"]').should('contain', '0');
    cy.get('[data-testid="current-value"]').should('not.exist');
  });

  it('should validate clean HTML structure', () => {
    // Verificar que no hay contenido Vue en el HTML source
    cy.request('/').then((response) => {
      const htmlContent = response.body;
      
      // No debería contener templates Vue en el HTML
      expect(htmlContent).to.not.include('{{ title }}');
      expect(htmlContent).to.not.include('v-if');
      expect(htmlContent).to.not.include('@click');
      
      // Solo debería tener el div#app
      expect(htmlContent).to.include('<div id="app"></div>');
      
      // El CSS debería estar presente
      expect(htmlContent).to.include('.container');
      expect(htmlContent).to.include('.current-value');
    });
  });
});
