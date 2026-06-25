import { config } from '@vue/test-utils'

config.global.mocks = {
    $router: {
        push: () => {},
        replace: () => {}
    },
    $route: {
        params: {}
    }
}

global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {}
}

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {}
    })
})

global.console.warn = () => {}
global.console.error = () => {}