export const useURLParams = () => {
    const params = {};
    if (window.location.search !== '') {
        window.location.search.substr(1).split('&').forEach(part => {
            let keyVal = part.split('=');
            params[keyVal[0]] = keyVal[1];
        });
    }

    return params;
}