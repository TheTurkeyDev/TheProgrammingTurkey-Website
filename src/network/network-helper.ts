export function getDevAPIBase() {
    return isDevEnv() ? 'https://api.test.local' : 'https://api.theturkey.dev';
}

export function getSiteURLBase() {
    return isDevEnv() ? 'https://test.local' : 'https://theturkey.dev';
}

export function getYTSiteURLBase() {
    return isDevEnv() ? 'http://localhost:8082' : 'https://theturkey.dev';
}

export function getAppsSiteBase() {
    return isDevEnv() ? 'https://app.test.local' : 'https://apps.theturkey.dev';
}

export function getStreamAnimationsOverlaySiteBase() {
    return isDevEnv() ? 'http://localhost:8085/' : 'https://apps.theturkey.dev/streamanimations';
}

function isDevEnv() {
    return process.env.NODE_ENV && process.env.NODE_ENV === 'development';
}

