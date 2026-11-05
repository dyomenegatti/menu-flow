<template>
    <div>
        <v-tabs
            v-model="activeTab"
            :color="color"
            :inset="inset"
            :class="tabsClass"
        >
            <v-tab
                v-for="item in tabs"
                :key="item.value"
                :value="item.value"
            >
                {{ item.title }}
            </v-tab>
        </v-tabs>

        <v-tabs-window v-model="activeTab">
            <v-tabs-window-item
                v-for="item in tabs"
                :key="item.value"
                :value="item.value"
            >
                <slot :name="item.value" />
            </v-tabs-window-item>
        </v-tabs-window>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    tabs: {
        type: Array,
        required: true
    },
    inset: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: 'primary'
    },
    tabsClass: {
        type: String,
        default: ''
    }
});

const activeTab = ref(props.tabs[0]?.value);

watch(
    () => props.tabs,
    (newTabs) => {
        if (!newTabs.some(tab => tab.value === activeTab.value)) {
            activeTab.value = newTabs[0]?.value;
        }
    }
);
</script>
