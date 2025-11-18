import { describe, it, expect } from 'vitest';
import { App } from '../src/components/App.js';

describe('App Component - Multiselect', () => {
    it('should have correct component structure', () => {
        expect(App.name).toBe('App');
        expect(App.setup).toBeDefined();
        expect(App.template).toBeDefined();
    });

    describe('Setup function', () => {
        it('should initialize with correct default values', () => {
            const setup = App.setup();

            expect(setup.title.value).toBe('Multiselect');
            expect(setup.subtitle.value).toBe('Seleccionando opciones');
            expect(setup.selectedItems_a.value).toEqual([]);
            expect(setup.selectedItems_b.value).toEqual([]);
            expect(setup.selectedItems_c.value).toEqual([]);
        });

        it('should have items with correct structure', () => {
            const setup = App.setup();

            expect(setup.items_a.value).toHaveLength(3);
            expect(setup.items_b.value).toHaveLength(3);
            expect(setup.items_c.value).toHaveLength(3);

            // Check B items have sources
            setup.items_b.value.forEach(item => {
                expect(item.sources).toBeDefined();
                expect(Array.isArray(item.sources)).toBe(true);
            });

            // Check C items have sources
            setup.items_c.value.forEach(item => {
                expect(item.sources).toBeDefined();
                expect(Array.isArray(item.sources)).toBe(true);
            });
        });
    });

    describe('Auto-selection logic - A -> B -> C', () => {
        it('should auto-select B items when A is selected', () => {
            const setup = App.setup();

            // Select a0
            setup.selectedItems_a.value = ['a0'];

            // b0 and b1 should be auto-selected (they have a0 as source)
            expect(setup.autoSelected_b.value).toContain('b0');
            expect(setup.autoSelected_b.value).toContain('b1');
            expect(setup.autoSelected_b.value).not.toContain('b2');
        });

        it('should auto-select C items when A is selected (via B)', () => {
            const setup = App.setup();

            // Select a0
            setup.selectedItems_a.value = ['a0'];

            // c0 and c1 should be auto-selected (via b0 and b1)
            expect(setup.autoSelected_c.value).toContain('c0');
            expect(setup.autoSelected_c.value).toContain('c1');
        });

        it('should handle multiple A selections', () => {
            const setup = App.setup();

            // Select a0 and a1
            setup.selectedItems_a.value = ['a0', 'a1'];

            // All B items should be auto-selected
            expect(setup.autoSelected_b.value).toContain('b0');
            expect(setup.autoSelected_b.value).toContain('b1');
            expect(setup.autoSelected_b.value).toContain('b2');

            // All C items should be auto-selected
            expect(setup.autoSelected_c.value).toContain('c0');
            expect(setup.autoSelected_c.value).toContain('c1');
            expect(setup.autoSelected_c.value).toContain('c2');
        });
    });

    describe('Auto-selection logic - B -> C', () => {
        it('should auto-select C items when B is selected', () => {
            const setup = App.setup();

            // Select b0
            setup.selectedItems_b.value = ['b0'];

            // c0 and c1 should be auto-selected
            expect(setup.autoSelected_c.value).toContain('c0');
            expect(setup.autoSelected_c.value).toContain('c1');
            expect(setup.autoSelected_c.value).not.toContain('c2');
        });
    });

    describe('Auto-selection logic - B -> A', () => {
        it('should auto-select A items when B is selected', () => {
            const setup = App.setup();

            // Select b0
            setup.selectedItems_b.value = ['b0'];

            // a0 should be auto-selected (source of b0)
            expect(setup.autoSelected_a.value).toContain('a0');
            expect(setup.autoSelected_a.value).not.toContain('a1');
            expect(setup.autoSelected_a.value).not.toContain('a2');
        });

        it('should handle B items with multiple sources', () => {
            const setup = App.setup();

            // Select b1 (has sources: a0, a1)
            setup.selectedItems_b.value = ['b1'];

            // Both a0 and a1 should be auto-selected
            expect(setup.autoSelected_a.value).toContain('a0');
            expect(setup.autoSelected_a.value).toContain('a1');
            expect(setup.autoSelected_a.value).not.toContain('a2');
        });
    });

    describe('Auto-selection logic - C -> B -> A', () => {
        it('should auto-select B items when C is selected', () => {
            const setup = App.setup();

            // Select c0
            setup.selectedItems_c.value = ['c0'];

            // b0 should be auto-selected
            expect(setup.autoSelected_b.value).toContain('b0');
            expect(setup.autoSelected_b.value).not.toContain('b1');
            expect(setup.autoSelected_b.value).not.toContain('b2');
        });

        it('should auto-select A items when C is selected (via B)', () => {
            const setup = App.setup();

            // Select c0 (sources: b0, which has source: a0)
            setup.selectedItems_c.value = ['c0'];

            // a0 should be auto-selected
            expect(setup.autoSelected_a.value).toContain('a0');
        });

        it('should handle C items with multiple sources', () => {
            const setup = App.setup();

            // Select c1 (sources: b0, b1)
            setup.selectedItems_c.value = ['c1'];

            // b0 and b1 should be auto-selected
            expect(setup.autoSelected_b.value).toContain('b0');
            expect(setup.autoSelected_b.value).toContain('b1');

            // a0 and a1 should be auto-selected (sources of b0 and b1)
            expect(setup.autoSelected_a.value).toContain('a0');
            expect(setup.autoSelected_a.value).toContain('a1');
        });
    });

    describe('Complex scenarios', () => {
        it('should handle mixed selections across all levels', () => {
            const setup = App.setup();

            // Select a1 and c2
            setup.selectedItems_a.value = ['a1'];
            setup.selectedItems_c.value = ['c2'];

            // From a1: b1 and b2 should be auto-selected
            expect(setup.autoSelected_b.value).toContain('b1');
            expect(setup.autoSelected_b.value).toContain('b2');

            // From a1 via B: c1 and c2 should be auto-selected
            expect(setup.autoSelected_c.value).toContain('c1');
            expect(setup.autoSelected_c.value).toContain('c2');

            // From c2: b1 and b2 are sources
            expect(setup.autoSelected_b.value).toContain('b1');
            expect(setup.autoSelected_b.value).toContain('b2');

            // From c2 via B: a1 and a2 should be auto-selected
            expect(setup.autoSelected_a.value).toContain('a1');
            expect(setup.autoSelected_a.value).toContain('a2');
        });

        it('should not include manually selected items in auto-selected', () => {
            const setup = App.setup();

            // Manually select a0
            setup.selectedItems_a.value = ['a0'];

            // a0 should NOT be in autoSelected_a even if it would be auto-selected
            expect(setup.autoSelected_a.value).not.toContain('a0');
        });
    });

    describe('Template structure', () => {
        it('should have bold class binding for auto-selected items', () => {
            const template = App.template;

            // Check for bold class bindings
            expect(template).toContain(':class="{ bold: autoSelected_a.includes(item.value) && !selectedItems_a.includes(item.value) }"');
            expect(template).toContain(':class="{ bold: autoSelected_b.includes(item.value) && !selectedItems_b.includes(item.value) }"');
            expect(template).toContain(':class="{ bold: autoSelected_c.includes(item.value) && !selectedItems_c.includes(item.value) }"');
        });

        it('should have bold CSS style', () => {
            const template = App.template;
            expect(template).toContain('.bold');
            expect(template).toContain('font-weight: bold');
        });

        it('should have checkboxes bound to selectedItems', () => {
            const template = App.template;
            expect(template).toContain('v-model="selectedItems_a"');
            expect(template).toContain('v-model="selectedItems_b"');
            expect(template).toContain('v-model="selectedItems_c"');
        });
    });
});
