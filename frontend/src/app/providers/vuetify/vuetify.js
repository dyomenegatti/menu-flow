import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const lightTheme = {
  dark: false,
  colors: {
    background: '#F5F5F5',
    surface: '#FAFAFA',

    primary: '#D4A017',
    secondary: '#AA2B1D',

    success: '#4CAF50',
    warning: '#FB8C00',
    error: '#D32F2F',
    info: '#2196F3',

    'on-background': '#212121',
    'on-surface': '#212121',
    'on-outline': '#D3D3D3',
  },
};

const darkTheme = {
  dark: true,
  colors: {
    background: '#212121',
    surface: '#2C2C2C',

    primary: '#D4A017',
    secondary: '#AA2B1D',

    success: '#4CAF50',
    warning: '#FB8C00',
    error: '#D32F2F',
    info: '#2196F3',

    'on-background': '#FAFAFA',
    'on-surface': '#E0DEDE',
    'on-primary': '#212121',
    'on-secondary': '#FAFAFA',
  },
};

const themes = ['lightTheme', 'darkTheme'];

const savedTheme = themes.includes(localStorage.getItem('theme'))
  ? localStorage.getItem('theme')
  : 'lightTheme';
  
const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi }
    },
    theme: {
        defaultTheme: savedTheme,
        themes: {
        lightTheme,
        darkTheme,
        },
    },
    display: {
        mobileBreakpoint: 900
    },
});

export default vuetify;