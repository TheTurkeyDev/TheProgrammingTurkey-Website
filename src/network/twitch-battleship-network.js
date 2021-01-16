import * as authAPI from './auth-network';
import { getDevAPIBase } from './network-helper';

export async function getToken() {
    return await fetch(`${getDevAPIBase()}/twitchbattleship/token`, authAPI.getGetAuthParams()).then(resp => {
        return resp.text();
    });
}

export async function regenToken() {
    return await fetch(`${getDevAPIBase()}/twitchbattleship/regentoken`, authAPI.getPostAuthParams()).then(resp => {
        return resp.text();
    });
}

export async function getTwitchBattleshipSettings(token) {
    return await fetch(`${getDevAPIBase()}/twitchbattleship/settings?token=${token}`, authAPI.getGetAuthParams()).then(resp => {
        return resp.json();
    });
}

export async function saveTwitchBattleshipSettings(token, settingsJson) {
    return await fetch(`${getDevAPIBase()}/twitchbattleship/savesettings?token=${token}`, authAPI.getPostAuthParams(settingsJson)).then(resp => {
        return resp.json();
    });
}