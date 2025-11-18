import { ref, computed } from 'vue';
import { Selector } from './Selector.js';

export const MultiSelector = {
    name: 'MultiSelector',
    components: {
        Selector
    },
    props: {
        itemsA: {
            type: Array,
            required: true
        },
        itemsB: {
            type: Array,
            required: true
        },
        itemsC: {
            type: Array,
            required: true
        }
    },
    setup(props) {
        const { itemsA, itemsB, itemsC } = props;

        const items_a = ref(itemsA);
        const items_b = ref(itemsB);
        const items_c = ref(itemsC);

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
        <div class="multi-selector">
            <selector
                title="a"
                :items="items_a"
                v-model:selected-items="selectedItems_a"
                :auto-selected-items="autoSelected_a"
                :show-sources="false"
            />

            <selector
                title="b"
                :items="items_b"
                v-model:selected-items="selectedItems_b"
                :auto-selected-items="autoSelected_b"
                :show-sources="true"
            />

            <selector
                title="c"
                :items="items_c"
                v-model:selected-items="selectedItems_c"
                :auto-selected-items="autoSelected_c"
                :show-sources="true"
            />
        </div>
    `
};

export default MultiSelector;
