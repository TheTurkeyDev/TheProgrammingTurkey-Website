export function getDevAPIBase()
{
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
        return "http://localhost:8081";
    }
    else {
        return "https://api.theturkey.dev";
    }
}

export function getSiteURLBase()
{
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
        return "https://localhost:8080";
    }
    else {
        return "https://theprogrammingturkey.com/";
    }
}