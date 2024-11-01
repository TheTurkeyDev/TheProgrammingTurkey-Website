export function getDevAPIBase() {
    return isDevEnv() ? 'http://localhost:8080/api' : 'https://api.theturkey.dev';
}

export function getSiteURLBase() {
    return isDevEnv() ? 'http://localhost:8080' : 'https://theturkey.dev';
}

export function getYTSiteURLBase() {
    return isDevEnv() ? 'http://localhost:8080' : 'https://theturkey.dev';
}

export function getAppsSiteBase() {
    return isDevEnv() ? 'https://app.test.local' : 'https://apps.theturkey.dev';
}

export function getStreamAnimationsOverlaySiteBase() {
    return isDevEnv() ? 'http://localhost:8085/' : 'https://apps.theturkey.dev/streamanimations';
}

export function getVideoGenSiteBase() {
    return isDevEnv() ? 'http://localhost:8084/' : 'https://videogen.theturkey.dev';
}

function isDevEnv() {
    return process.env.NODE_ENV && process.env.NODE_ENV === 'development';
}

