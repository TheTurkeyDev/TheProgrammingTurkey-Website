export function getDevAPIBase()
{
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
        return "https://localhost/api";
    }
    else {
        return "https://api.theturkey.dev";
    }
}

export function getSiteURLBase()
{
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
        return "https://localhost";
    }
    else {
        return "https://theprogrammingturkey.com/";
    }
}