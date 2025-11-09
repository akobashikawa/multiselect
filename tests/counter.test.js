import { describe, it, expect, beforeEach } from 'vitest';
import { CounterLogic, useCounter, Counter } from '../src/components/Counter.js';

describe('Counter Logic', () => {
    let counter;

    beforeEach(() => {
        counter = new CounterLogic();
    });

    it('should initialize with default value of 0', () => {
        expect(counter.getValue()).toBe(0);
    });

    it('should initialize with custom value', () => {
        const customCounter = new CounterLogic(5);
        expect(customCounter.getValue()).toBe(5);
    });

    it('should increment value by 1', () => {
        const result = counter.increment();
        expect(result).toBe(1);
        expect(counter.getValue()).toBe(1);
    });

    it('should decrement value by 1', () => {
        counter.increment(); // Start at 1
        const result = counter.decrement();
        expect(result).toBe(0);
        expect(counter.getValue()).toBe(0);
    });

    it('should handle negative values', () => {
        const result = counter.decrement();
        expect(result).toBe(-1);
        expect(counter.getValue()).toBe(-1);
    });

    it('should reset value to 0', () => {
        counter.increment();
        counter.increment();
        counter.increment();
        
        const result = counter.reset();
        expect(result).toBe(0);
        expect(counter.getValue()).toBe(0);
    });

    it('should handle multiple operations', () => {
        counter.increment(); // 1
        counter.increment(); // 2
        counter.decrement(); // 1
        counter.increment(); // 2
        
        expect(counter.getValue()).toBe(2);
    });
});

describe('useCounter Composable', () => {
    let counterComposable;

    beforeEach(() => {
        counterComposable = useCounter();
    });

    it('should provide correct initial count', () => {
        expect(counterComposable.count()).toBe(0);
    });

    it('should provide custom initial count', () => {
        const customComposable = useCounter(10);
        expect(customComposable.count()).toBe(10);
    });

    it('should increment through composable', () => {
        const result = counterComposable.increment();
        expect(result).toBe(1);
        expect(counterComposable.count()).toBe(1);
    });

    it('should decrement through composable', () => {
        counterComposable.increment();
        const result = counterComposable.decrement();
        expect(result).toBe(0);
        expect(counterComposable.count()).toBe(0);
    });

    it('should reset through composable', () => {
        counterComposable.increment();
        counterComposable.increment();
        
        const result = counterComposable.reset();
        expect(result).toBe(0);
        expect(counterComposable.count()).toBe(0);
    });
});

describe('Counter Component', () => {
    it('should have correct component structure', () => {
        expect(Counter.name).toBe('Counter');
        expect(Counter.props).toBeDefined();
        expect(Counter.emits).toBeDefined();
        expect(Counter.setup).toBeDefined();
        expect(Counter.template).toBeDefined();
    });

    it('should have initialValue prop with default 0', () => {
        expect(Counter.props.initialValue.type).toBe(Number);
        expect(Counter.props.initialValue.default).toBe(0);
    });

    it('should emit correct events', () => {
        const expectedEmits = ['update:count', 'increment', 'decrement', 'reset'];
        expect(Counter.emits).toEqual(expectedEmits);
    });

    it('should have template with correct structure', () => {
        const template = Counter.template;
        expect(template).toContain('counter-section');
        expect(template).toContain('data-testid="counter-display"');
        expect(template).toContain('data-testid="increment-btn"');
        expect(template).toContain('data-testid="decrement-btn"');
        expect(template).toContain('data-testid="reset-btn"');
        expect(template).toContain('data-testid="message"');
    });

    it('should have correct button texts in template', () => {
        const template = Counter.template;
        expect(template).toContain('Incrementar');
        expect(template).toContain('Decrementar');
        expect(template).toContain('Reset');
    });
});
