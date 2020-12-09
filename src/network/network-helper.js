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