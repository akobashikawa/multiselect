import { toRefs, computed } from 'vue';

export const Selector = {
    name: 'Selector',
    props: {
        title: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        selectedItems: {
            type: Array,
            required: true
        },
        autoSelectedItems: {
            type: Array,
            required: true
        },
        showSources: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:selectedItems'],
    setup(props, { emit }) {
        const { items, autoSelectedItems, showSources } = toRefs(props);

        // Computed property for v-model
        const selectedItemsModel = computed({
            get: () => props.selectedItems,
            set: (value) => emit('update:selectedItems', value)
        });

        return {
            items,
            selectedItemsModel,
            autoSelectedItems,
            showSources
        };
    },
    template: `
        <div class="selector">
            <h3>{{ title }}</h3>
            <span class="selected">{{ selectedItemsModel }}</span> 
            <span class="autoselected">{{ autoSelectedItems }}</span>
            <ul>
                <li v-for="item in items" :key="item.value">
                    <label>
                        <input 
                            type="checkbox" 
                            :name="'input-checkbox-' + title"
                            :value="item.value"
                            v-model="selectedItemsModel"
                        >
                        <span :class="{ 
                            selected: selectedItemsModel.includes(item.value), 
                            autoselected: autoSelectedItems.includes(item.value) && !selectedItemsModel.includes(item.value) 
                        }">
                            {{ item.label }}
                            <span v-if="showSources && item.sources">{{ item.sources }}</span>
                        </span>
                    </label>
                </li>
            </ul>
        </div>
    `
};

export default Selector;
