export function getDevAPIBase() {
    return isDevEnv() ? 'http://localhost:8080/api' : 'https://api.theturkey.dev';
}

export function getSiteURLBase() {
    return isDevEnv() ? 'http://localhost:8080' : 'https://theturkey.dev';
}

export function getAppsSiteBase() {
    return isDevEnv() ? 'http://localhost:8085' : 'https://apps.theturkey.dev';
}

export function getTwitchOverlaySiteBase() {
    return isDevEnv() ? 'http://localhost:8085/overlay' : 'https://apps.theturkey.dev/overlay';
}

export function getVideoGenSiteBase() {
    return isDevEnv() ? 'http://localhost:8084' : 'https://videogen.theturkey.dev';
}

export function getSocketURLBase() {
    return isDevEnv() ? 'ws://localhost:23490' : 'wss://ws.theturkey.dev';
}

function isDevEnv() {
    return process.env.NODE_ENV && process.env.NODE_ENV === 'development';
}

