<template>
  <v-app>
    <router-view />

    <v-btn @click="toMenu">
      Menu
    </v-btn>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vuetify/lib/composables/router.mjs';

const router = useRouter();

function toMenu() {
    router.push({ name: 'MenuView' })
}
</script>
