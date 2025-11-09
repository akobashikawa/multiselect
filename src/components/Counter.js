import { ref, computed } from 'vue';

// Lógica del contador - Separada para facilitar testing
export class CounterLogic {
    constructor(initialValue = 0) {
        this.value = initialValue;
    }

    increment() {
        this.value++;
        return this.value;
    }

    decrement() {
        this.value--;
        return this.value;
    }

    reset() {
        this.value = 0;
        return this.value;
    }

    getValue() {
        return this.value;
    }
}

// Composable para el contador
export function useCounter(initialValue = 0) {
    const counter = new CounterLogic(initialValue);
    
    return {
        count: () => counter.getValue(),
        increment: () => counter.increment(),
        decrement: () => counter.decrement(),
        reset: () => counter.reset()
    };
}

// Componente Counter Vue
export const Counter = {
    name: 'Counter',
    props: {
        initialValue: {
            type: Number,
            default: 0
        }
    },
    emits: ['update:count', 'increment', 'decrement', 'reset'],
    setup(props, { emit }) {
        const count = ref(props.initialValue);
        
        const message = computed(() => {
            if (count.value === 0) return '';
            if (count.value > 10) return '¡Wow! Número alto 🚀';
            if (count.value < -5) return 'Número muy bajo 📉';
            return `Contador: ${count.value}`;
        });

        const increment = () => {
            count.value++;
            emit('update:count', count.value);
            emit('increment', count.value);
        };

        const decrement = () => {
            count.value--;
            emit('update:count', count.value);
            emit('decrement', count.value);
        };

        const reset = () => {
            count.value = 0;
            emit('update:count', count.value);
            emit('reset', count.value);
        };

        return {
            count,
            message,
            increment,
            decrement,
            reset
        };
    },
    template: `
        <div class="counter-section">
            <div class="counter" data-testid="counter-display">{{ count }}</div>
            <div class="buttons">
                <button 
                    class="btn-increment" 
                    @click="increment"
                    data-testid="increment-btn">
                    Incrementar
                </button>
                <button 
                    class="btn-decrement" 
                    @click="decrement"
                    data-testid="decrement-btn">
                    Decrementar
                </button>
                <button 
                    class="btn-reset" 
                    @click="reset"
                    data-testid="reset-btn">
                    Reset
                </button>
            </div>
            
            <div v-if="message" class="message" data-testid="message">
                {{ message }}
            </div>
        </div>
    `
};

export default Counter;
