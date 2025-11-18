import { ref, computed } from 'vue';
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
            { value: 'b0', label: 'Option b0', sources: ['a0'] },
            { value: 'b1', label: 'Option b1', sources: ['a0', 'a1'] },
            { value: 'b2', label: 'Option b2', sources: ['a1', 'a2'] }
        ]);
        const items_c = ref([
            { value: 'c0', label: 'Option c0', sources: ['b0'] },
            { value: 'c1', label: 'Option c1', sources: ['b0', 'b1'] },
            { value: 'c2', label: 'Option c2', sources: ['b1', 'b2'] }
        ]);

        const selectedItems_a = ref([]);
        const selectedItems_b = ref([]);
        const selectedItems_c = ref([]);

        // Auto-selection logic
        // Rule: Select B -> Auto-select A (parents)
        // Rule: Select C -> Auto-select B (parents) -> Auto-select A (parents of those B items)
        const autoSelected_a = computed(() => {
            const auto = new Set();

            // From B selections
            selectedItems_b.value.forEach(bValue => {
                const bItem = items_b.value.find(item => item.value === bValue);
                if (bItem && bItem.sources) {
                    bItem.sources.forEach(source => auto.add(source));
                }
            });

            // From C selections (via B)
            selectedItems_c.value.forEach(cValue => {
                const cItem = items_c.value.find(item => item.value === cValue);
                if (cItem && cItem.sources) {
                    cItem.sources.forEach(bValue => {
                        const bItem = items_b.value.find(item => item.value === bValue);
                        if (bItem && bItem.sources) {
                            bItem.sources.forEach(source => auto.add(source));
                        }
                    });
                }
            });

            return Array.from(auto);
        });

        // Rule: Select A -> Auto-select B (children)
        // Rule: Select C -> Auto-select B (parents)
        const autoSelected_b = computed(() => {
            const auto = new Set();

            // From A selections (children)
            selectedItems_a.value.forEach(aValue => {
                items_b.value.forEach(bItem => {
                    if (bItem.sources && bItem.sources.includes(aValue)) {
                        auto.add(bItem.value);
                    }
                });
            });

            // From C selections (parents)
            selectedItems_c.value.forEach(cValue => {
                const cItem = items_c.value.find(item => item.value === cValue);
                if (cItem && cItem.sources) {
                    cItem.sources.forEach(source => auto.add(source));
                }
            });

            return Array.from(auto);
        });

        // Rule: Select B -> Auto-select C (children)
        // Rule: Select A -> Auto-select B (children) -> Auto-select C (children of those B items)
        const autoSelected_c = computed(() => {
            const auto = new Set();

            // From B selections
            selectedItems_b.value.forEach(bValue => {
                items_c.value.forEach(cItem => {
                    if (cItem.sources && cItem.sources.includes(bValue)) {
                        auto.add(cItem.value);
                    }
                });
            });

            // From A selections (via B)
            selectedItems_a.value.forEach(aValue => {
                items_b.value.forEach(bItem => {
                    if (bItem.sources && bItem.sources.includes(aValue)) {
                        items_c.value.forEach(cItem => {
                            if (cItem.sources && cItem.sources.includes(bItem.value)) {
                                auto.add(cItem.value);
                            }
                        });
                    }
                });
            });

            return Array.from(auto);
        });



        return {
            title,
            subtitle,
            items_a,
            items_b,
            items_c,
            selectedItems_a,
            selectedItems_b,
            selectedItems_c,
            autoSelected_a,
            autoSelected_b,
            autoSelected_c
        };
    },
    template: `
        <div class="container">
            <div class="header">
                <h1>{{ title }}</h1>
                <p>{{ subtitle }}</p>

                <h3>a</h3>
                {{ selectedItems_a }} {{ autoSelected_a }}
                <ul>
                    <li v-for="item in items_a" :key="item.value">
                        <label :class="{ bold: autoSelected_a.includes(item.value) && !selectedItems_a.includes(item.value) }">
                            <input 
                                type="checkbox" 
                                name="input-checkbox-a" 
                                :value="item.value"
                                v-model="selectedItems_a"
                            >
                            {{ item.label }}
                        </label>
                    </li>
                </ul>
                
                <h3>b</h3>
                {{ selectedItems_b }} {{ autoSelected_b }}
                <ul>
                    <li v-for="item in items_b" :key="item.value">
                        <label :class="{ bold: autoSelected_b.includes(item.value) && !selectedItems_b.includes(item.value) }">
                            <input 
                                type="checkbox" 
                                name="input-checkbox-b" 
                                :value="item.value"
                                v-model="selectedItems_b"
                            >
                            {{ item.label }}
                            {{ item.sources }}
                        </label>
                    </li>
                </ul>

                <h3>c</h3>
                {{ selectedItems_c }} {{ autoSelected_c }}
                <ul>
                    <li v-for="item in items_c" :key="item.value">
                        <label :class="{ bold: autoSelected_c.includes(item.value) && !selectedItems_c.includes(item.value) }">
                            <input 
                                type="checkbox" 
                                name="input-checkbox-c" 
                                :value="item.value"
                                v-model="selectedItems_c"
                            >
                            {{ item.label }}
                            {{ item.sources }}
                        </label>
                    </li>
                </ul>
                
            </div>
            
        </div>
        
        <style>
            .bold {
                font-weight: bold;
            }
        </style>
    `
};

export default App;
