import { ref } from 'vue';
import { Counter } from './Counter.js';
import { MultiSelector } from './MultiSelector.js';

// Componente App principal
export const App = {
    name: 'App',
    components: {
        Counter,
        MultiSelector
    },
    setup() {
        const title = ref('Multiselect');
        const subtitle = ref('Seleccionando opciones');

        const items_a = [
            { value: 'a0', label: 'Option a0' },
            { value: 'a1', label: 'Option a1' },
            { value: 'a2', label: 'Option a2' }
        ];
        const items_b = [
            { value: 'b0', label: 'Option b0', sources: ['a0'] },
            { value: 'b1', label: 'Option b1', sources: ['a0', 'a1'] },
            { value: 'b2', label: 'Option b2', sources: ['a1', 'a2'] }
        ];
        const items_c = [
            { value: 'c0', label: 'Option c0', sources: ['b0'] },
            { value: 'c1', label: 'Option c1', sources: ['b0', 'b1'] },
            { value: 'c2', label: 'Option c2', sources: ['b1', 'b2'] }
        ];

        return {
            title,
            subtitle,
            items_a,
            items_b,
            items_c
        };
    },
    template: `
        <div class="container">
            <div class="header">
                <h1>{{ title }}</h1>
                <p>{{ subtitle }}</p>

                <multi-selector
                    :items-a="items_a"
                    :items-b="items_b"
                    :items-c="items_c"
                />
                
            </div>
            
        </div>
        
    `
};

export default App;
