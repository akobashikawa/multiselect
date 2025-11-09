import { describe, it, expect } from 'vitest';
import { App } from '../src/components/App.js';

describe('App Component', () => {
    it('should have correct component structure', () => {
        expect(App.name).toBe('App');
        expect(App.components).toBeDefined();
        expect(App.setup).toBeDefined();
        expect(App.template).toBeDefined();
    });

    it('should include Counter component as dependency', () => {
        expect(App.components.Counter).toBeDefined();
    });

    it('should have template with correct structure', () => {
        const template = App.template;
        
        // Verificar estructura principal
        expect(template).toContain('<div class="container">');
        expect(template).toContain('<div class="header">');
        
        // Verificar elementos del header
        expect(template).toContain('<h1>{{ title }}</h1>');
        expect(template).toContain('<p>{{ subtitle }}</p>');
        expect(template).toContain('data-testid="current-value"');
        
        // Verificar uso del componente Counter
        expect(template).toContain('<counter');
        expect(template).toContain(':initial-value="0"');
        expect(template).toContain('@update:count="handleCountUpdate"');
        expect(template).toContain('data-testid="counter-component"');
    });

    it('should have conditional rendering for current value', () => {
        const template = App.template;
        expect(template).toContain('v-if="currentCount !== 0"');
        expect(template).toContain('Valor actual: {{ currentCount }}');
    });

    it('should have correct CSS classes', () => {
        const template = App.template;
        expect(template).toContain('class="container"');
        expect(template).toContain('class="header"');
        expect(template).toContain('class="current-value"');
    });

    it('should have proper data-testid attributes for testing', () => {
        const template = App.template;
        expect(template).toContain('data-testid="current-value"');
        expect(template).toContain('data-testid="counter-component"');
    });

    describe('App Component Setup', () => {
        it('should initialize with correct default values', () => {
            const mockEmit = vi.fn();
            const { title, subtitle, currentCount } = App.setup({}, { emit: mockEmit });
            
            expect(title.value).toBe('Contador TDD');
            expect(subtitle.value).toBe('Template para TDD con Vue CDN + Import Maps');
            expect(currentCount.value).toBe(0);
        });

        it('should provide handleCountUpdate function', () => {
            const mockEmit = vi.fn();
            const setupResult = App.setup({}, { emit: mockEmit });
            
            expect(setupResult.handleCountUpdate).toBeDefined();
            expect(typeof setupResult.handleCountUpdate).toBe('function');
        });

        it('should update currentCount when handleCountUpdate is called', () => {
            const mockEmit = vi.fn();
            const { currentCount, handleCountUpdate } = App.setup({}, { emit: mockEmit });
            
            expect(currentCount.value).toBe(0);
            
            handleCountUpdate(5);
            expect(currentCount.value).toBe(5);
            
            handleCountUpdate(-3);
            expect(currentCount.value).toBe(-3);
            
            handleCountUpdate(0);
            expect(currentCount.value).toBe(0);
        });
    });
});
