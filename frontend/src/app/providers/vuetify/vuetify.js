import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

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
    'on-gray': '#E0DEDE',
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
    'on-outline': '#212121',
    'on-gray': '#454545',
  },
};

const THEME_KEY = 'theme';

const savedThemeRaw = localStorage.getItem(THEME_KEY);

const savedTheme =
  savedThemeRaw === 'darkTheme' || savedThemeRaw === 'lightTheme'
    ? savedThemeRaw
    : 'lightTheme';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: savedTheme,
    themes: {
      lightTheme,
      darkTheme,
    },
  },
  display: {
    mobileBreakpoint: 900,
  },
  defaults: {
    global: {
      style: {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
      },
    },
  },
});

export default vuetify;