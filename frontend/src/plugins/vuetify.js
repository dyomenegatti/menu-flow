import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const lightTheme = {
    colors: {
        primary: '#FF5722',
        secondary: '#FFDACF',
        backgroundElements: '#FFDFD7',
        error: '#B71C1C',
        warning: '#FBC02D',
        success: '#388E3C',
        background: '#FAFAFA',
        text: '#212121',
    }
};

const darkTheme  = {
    colors: {
        primary: '#FF5722',
        secondary: '#FFDACF',
        backgroundElements: '#fde7e0',
        error: '#E53935',
        warning: '#FFEE58',
        success: '#43A047',
        background: '#212121',
        text: '#FFFFFF',
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
            dark: darkTheme ,
        },
    },
    display: {
        mobileBreakpoint: 900
    },
});

export default vuetify;