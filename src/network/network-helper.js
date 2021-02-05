export function getDevAPIBase()
{
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
        return "https://api.test.local";
    }
    else {
        return "https://api.theturkey.dev";
    }
}

export function getSiteURLBase()
{
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
        return "https://test.local";
    }
    else {
        return "https://site.theturkey.dev";
    }
}

export function getYTSiteURLBase()
{
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
        return "http://localhost:8081";
    }
    else {
        return "https://api.theturkey.dev";
    }
}

export function getAppsSiteBase()
{
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
        return "https://app.test.local";
    }
    else {
        return "https://apps.theturkey.dev";
    }
}