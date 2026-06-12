import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import './style.css'
import '@mdi/font/css/materialdesignicons.css'
import vuetify from './app/providers/vuetify/vuetify';
import router from './app/router/index';

createApp(App)
    .use(vuetify)
    .use(router)
    .mount('#app')
