import * as authAPI from './auth-network';
import { getDevAPIBase } from './network-helper';

export async function getToken(game) {
    return await fetch(`${getDevAPIBase()}/twitchgames/${game}/token`, authAPI.getGetAuthParams()).then(resp => {
        return resp.text();
    });
}

export async function regenToken(game) {
    return await fetch(`${getDevAPIBase()}/twitchgames/${game}/regentoken`, authAPI.getPostAuthParams()).then(resp => {
        return resp.text();
    });
}

export async function getTwitchGameSettings(game, token) {
    return await fetch(`${getDevAPIBase()}/twitchgames/${game}/settings?token=${token}`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function saveTwitchGameSettings(game, token, settingsJson) {
    return await fetch(`${getDevAPIBase()}/twitchgames/${game}/savesettings?token=${token}`, authAPI.getPostAuthParams(settingsJson)).then(resp => {
        return resp.json();
    });
}