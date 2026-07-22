<template>
  <div>
    <div v-if="mobile" class="pa-2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      :temporary="mobile"
      :permanent="!mobile"
      :app="variant === 'contained'"
      :class="drawerClass"
    >
      <slot name="before-list" />

      <v-list nav class="py-2">
        <template v-for="item in items">
          <slot
            name="item"
            :item="item"
          ></slot>
        </template>
      </v-list>

      <slot name="after-list" />

      <template #append>
        <slot name="footer"></slot>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import { useTheme } from "vuetify";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  title: String,
  icon: {
    type: String,
    default: "mdi-view-dashboard",
  },
  variant: {
    type: String,
    default: "full",
  },
});

const router = useRouter();
const theme = useTheme();
const { mobile } = useDisplay();
const drawer = ref(!mobile.value);

const drawerClass = computed(() => {
  return props.variant === "full"
    ? "drawer-full"
    : "drawer-contained";
});

watch(mobile, (isMobile) => {
  drawer.value = !isMobile;
});
</script>

<style scoped>
.drawer-full {
  position: fixed;
  top: 0;
  height: 100vh;
}

.drawer-contained {
  position: relative;
  height: auto;
}

:deep(.v-list-item--active),
:deep(.v-list-item:hover) {
  background-color: rgb(var(--v-theme-primary)) !important;
  color: white !important;
  opacity: 1 !important;
}

:deep(.v-list-item--active .v-list-item__overlay) {
  opacity: 0 !important;
}

:deep(.v-navigation-drawer.drawer-contained) {
    z-index: auto !important;
}
</style>