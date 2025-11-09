import { ref } from 'vue';
import { Counter } from './Counter.js';

// Componente App principal
export const App = {
    name: 'App',
    components: {
        Counter
    },
    setup() {
        const title = ref('Multiselect');
        const subtitle = ref('Seleccionando opciones');
        
        const items_a = ref([
            { value: 'a0', label: 'Option a0' },
            { value: 'a1', label: 'Option a1' },
            { value: 'a2', label: 'Option a2' }
        ]);
        const items_b = ref([
            { value: 'b0', label: 'Option b0', sources: ['a0']},
            { value: 'b1', label: 'Option b1', sources: ['a0', 'a1']},
            { value: 'b2', label: 'Option b2', sources: ['a1', 'a2']}
        ]);
        const items_c = ref([
            { value: 'c0', label: 'Option c0' },
            { value: 'c1', label: 'Option c1' },
            { value: 'c2', label: 'Option c2' }
        ]);

        const selectedItems_a = ref([]);

        function handler_a(item) {
            console.log('Selección actual:', selectedItems_a.value);
        };

        const selectedItems_b = ref([]);

        function handler_b(item) {
            console.log('Selección actual:', selectedItems_b.value);
        };

        const selectedItems_c = ref([]);

        function handler_c(item) {
            console.log('Selección actual:', selectedItems_c.value);
        };

        return {
            title,
            subtitle,
            items_a,
            items_b,
            items_c,
            selectedItems_a,
            selectedItems_b,
            selectedItems_c,
            handler_a,
            handler_b,
            handler_c
        };
    },
    template: `
        <div class="container">
            <div class="header">
                <h1>{{ title }}</h1>
                <p>{{ subtitle }}</p>

                <h3>a</h3>
                {{ selectedItems_a }}
                <ul>
                    <li v-for="item in items_a" :key="item.value">
                        <label>
                            <input 
                                type="checkbox" 
                                name="input-checkbox-a" 
                                :value="item.value"
                                v-model="selectedItems_a"
                                @change="handler_a(item)"
                            >
                            {{ item.label }}
                        </label>
                    </li>
                </ul>
                
                <h3>b</h3>
                {{ selectedItems_b }}
                <ul>
                    <li v-for="item in items_b" :key="item.value">
                        <label>
                            <input 
                                type="checkbox" 
                                name="input-checkbox-b" 
                                :value="item.value"
                                v-model="selectedItems_b"
                                @change="handler_b(item)"
                            >
                            {{ item.label }}
                            {{ item.sources }}
                        </label>
                    </li>
                </ul>

                <h3>c</h3>
                {{ selectedItems_c }}
                <ul>
                    <li v-for="item in items_c" :key="item.value">
                        <label>
                            <input 
                                type="checkbox" 
                                name="input-checkbox-c" 
                                :value="item.value"
                                v-model="selectedItems_c"
                                @change="handler_c(item)"
                            >
                            {{ item.label }}
                        </label>
                    </li>
                </ul>
                
            </div>
            
        </div>
    `
};

export default App;
