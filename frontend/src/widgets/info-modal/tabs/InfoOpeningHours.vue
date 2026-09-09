<template>
    <v-container>
        <v-hover
            v-for="day in formattedOpeningHours"
            :key="day.weekDay"
        >
            <template v-slot:default="{ isHovering, props }">
                <v-row
                    v-bind="props"
                    class="opening-hours-row"
                    :class="{
                        'bg-primary-lighten-5': isHovering,
                    }"
                >
                    <v-col>
                        <v-sheet
                            class="text-label-small font-weight-semibold"
                            :class="{ 'text-primary': isHovering }"
                        >
                            {{ day.name }}
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <v-sheet
                            :class="{ 'text-primary': isHovering }"
                        >
                            {{ day.hours }}
                        </v-sheet>
                    </v-col>
                </v-row>
            </template>
        </v-hover>
    </v-container>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    restaurant: {
        type: Object,
        default: null,
    },
});

const weekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
];

const formattedOpeningHours = computed(() => {
    if (!props.restaurant?.opening_hours) return [];

    return [...props.restaurant.opening_hours]
        .sort((a, b) => a.week_day - b.week_day)
        .map(day => ({
            weekDay: day.week_day,
            name: weekDays[day.week_day],
            hours: day.is_closed
                ? 'Fechado'
                : `${formatHour(day.opens_at)} às ${formatHour(day.closes_at)}`,
        }));
});

function formatHour(time) {
    if (!time) return '';

    return time.slice(0, 5);
}
</script>

<style scoped>
.opening-hours-row {
    transition: background-color 0.2s ease;
}
</style>