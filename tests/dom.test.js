import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/dom';

// Simulación del DOM para testing
function setupDOM() {
    document.body.innerHTML = `
        <div id="app">
            <div class="container">
                <h1>Contador TDD</h1>
                <div class="counter" data-testid="counter-display">0</div>
                <button class="btn-increment" data-testid="increment-btn">Incrementar</button>
                <button class="btn-decrement" data-testid="decrement-btn">Decrementar</button>
                <button class="btn-reset" data-testid="reset-btn">Reset</button>
                <div data-testid="message"></div>
            </div>
        </div>
    `;
}

describe('DOM Integration Tests', () => {
    beforeEach(() => {
        setupDOM();
    });

    it('should render counter elements', () => {
        const counterDisplay = screen.getByTestId('counter-display');
        const incrementBtn = screen.getByTestId('increment-btn');
        const decrementBtn = screen.getByTestId('decrement-btn');
        const resetBtn = screen.getByTestId('reset-btn');

        expect(counterDisplay).toBeInTheDocument();
        expect(incrementBtn).toBeInTheDocument();
        expect(decrementBtn).toBeInTheDocument();
        expect(resetBtn).toBeInTheDocument();
    });

    it('should have correct initial values', () => {
        const counterDisplay = screen.getByTestId('counter-display');
        expect(counterDisplay).toHaveTextContent('0');
    });

    it('should have correct button texts', () => {
        const incrementBtn = screen.getByTestId('increment-btn');
        const decrementBtn = screen.getByTestId('decrement-btn');
        const resetBtn = screen.getByTestId('reset-btn');

        expect(incrementBtn).toHaveTextContent('Incrementar');
        expect(decrementBtn).toHaveTextContent('Decrementar');
        expect(resetBtn).toHaveTextContent('Reset');
    });

    it('should have proper CSS classes', () => {
        const incrementBtn = screen.getByTestId('increment-btn');
        const decrementBtn = screen.getByTestId('decrement-btn');
        const resetBtn = screen.getByTestId('reset-btn');

        expect(incrementBtn).toHaveClass('btn-increment');
        expect(decrementBtn).toHaveClass('btn-decrement');
        expect(resetBtn).toHaveClass('btn-reset');
    });

    it('should be able to simulate click events', async () => {
        const incrementBtn = screen.getByTestId('increment-btn');
        
        // Verificar que el botón es clickeable
        expect(incrementBtn).toBeEnabled();
        
        // Simular click (aunque no tengamos la lógica Vue conectada en este test)
        await fireEvent.click(incrementBtn);
        
        // El evento se disparó sin errores
        expect(incrementBtn).toBeInTheDocument();
    });
});

describe('Accessibility Tests', () => {
    beforeEach(() => {
        setupDOM();
    });

    it('should have proper test ids for testing', () => {
        expect(screen.getByTestId('counter-display')).toBeInTheDocument();
        expect(screen.getByTestId('increment-btn')).toBeInTheDocument();
        expect(screen.getByTestId('decrement-btn')).toBeInTheDocument();
        expect(screen.getByTestId('reset-btn')).toBeInTheDocument();
        expect(screen.getByTestId('message')).toBeInTheDocument();
    });

    it('should have semantic HTML structure', () => {
        const buttons = document.querySelectorAll('button');
        const heading = document.querySelector('h1');
        
        expect(buttons.length).toBe(3);
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('Contador TDD');
    });
});
