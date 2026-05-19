import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import vuetify from './app/providers/vuetify/vuetify';
import router from './app/router/index';

createApp(App)
    .use(vuetify)
    .use(router)
    .mount('#app')
