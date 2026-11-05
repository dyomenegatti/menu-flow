<template>
  <div>
      <v-chip
        :color="color"
        :variant="variant"
      >
        <span>
          <slot />
        </span>

        <BaseBadge
            v-if="contentBadge"
            :color="colorBadge"
            :content="contentBadge"
            :location="locationBadge"
        ></BaseBadge>
      </v-chip>
  </div>
</template>

<script setup>
import BaseBadge from '../badge/BaseBadge.vue';

defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  variant: {
    type: String,
    default: 'flat'
  },
  colorBadge: {
    type: String,
    default: 'primary'
  },
  contentBadge: {
    type: String,
    default: ''
  },
  locationBadge: {
    type: String,
    default: 'right center'
  }
})
</script>