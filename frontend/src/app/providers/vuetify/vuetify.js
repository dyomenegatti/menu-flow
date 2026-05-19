import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const lightTheme = {
    dark: false,
    colors: {
        primary: '#D4A017',
        'primary-foreground': '#000000',
        secondary: '#F5F5F5',
        'secondary-foreground': '#000000',
        background: '#FFFFFF',
        surface: '#FFFFFF',
        'on-background': '#000000',
        'on-surface': '#000000',
        muted: '#E8E8E8',
        'muted-foreground': '#666666',
        border: '#E8E8E8',
        accent: '#D4A017',
        error: '#DC2626',
        sidebar: '#F5F5F5',
        'sidebar-foreground': '#000000',
        'sidebar-accent': '#E8E8E8',
    }
};

const darkTheme = {
    dark: true,
    colors: {
        primary: '#D4A017',
        'primary-foreground': '#000000',
        secondary: '#2A2A2A',
        'secondary-foreground': '#FFFFFF',
        background: '#000000',
        surface: '#1A1A1A',
        'on-background': '#FFFFFF',
        'on-surface': '#FFFFFF',
        muted: '#2A2A2A',
        'muted-foreground': '#A0A0A0',
        border: '#2A2A2A',
        accent: '#D4A017',
        error: '#EF4444',
        sidebar: '#1A1A1A',
        'sidebar-foreground': '#FFFFFF',
        'sidebar-accent': '#2A2A2A',
    }
};

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi }
    },
    theme: {
        defaultTheme: 'light',
        themes: {
        light: lightTheme,
        dark: darkTheme,
        },
    },
    display: {
        mobileBreakpoint: 900
    },
});

export default vuetify;