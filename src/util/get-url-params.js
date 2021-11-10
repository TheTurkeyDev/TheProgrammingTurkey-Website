export const getURLParams = (paramsFull) => {
    const params = {};
    if (paramsFull !== '') {
        paramsFull.substr(1).split('&').forEach(part => {
            let keyVal = part.split('=');
            params[keyVal[0]] = keyVal[1];
        });
    }
    return params;
}