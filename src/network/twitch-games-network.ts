import * as authAPI from './auth-network';
import { getDevAPIBase } from './network-helper';

export async function getToken(game: string) {
    return await fetch(`${getDevAPIBase()}/twitchgames/${game}/token`, authAPI.getGetAuthParams()).then(resp => {
        return resp.text();
    });
}

export async function regenToken(game: string) {
    return await fetch(`${getDevAPIBase()}/twitchgames/${game}/regentoken`, authAPI.getPostAuthParams()).then(resp => {
        return resp.text();
    });
}

export async function getTwitchGameSettings(game: string, token: string) {
    return await fetch(`${getDevAPIBase()}/twitchgames/${game}/settings?token=${token}`, authAPI.getGetAuthParams()).then(resp => {
        if (resp.ok)
            return resp.json();
        return undefined;
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveTwitchGameSettings(game: string, token: string, settingsJson: any) {
    return await fetch(`${getDevAPIBase()}/twitchgames/${game}/settings?token=${token}`, authAPI.getPostAuthParams(settingsJson)).then(resp => {
        return resp.json();
    });
}