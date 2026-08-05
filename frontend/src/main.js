import { createApp } from 'vue';
import App from './App.vue';

import 'vuetify/styles';
import './style.css';
import '@mdi/font/css/materialdesignicons.css';
import vuetify from './app/providers/vuetify/vuetify';

import router from './app/router/index';

import VueToastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { createPinia } from 'pinia';
const pinia = createPinia();

createApp(App)
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueToastify, {
        autoClose: 3000
    })
    .mount('#app')
