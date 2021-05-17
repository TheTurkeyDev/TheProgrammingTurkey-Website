import { getPostAuthParams } from './auth-network';
import { getDevAPIBase } from './network-helper';

export async function getChanceCubesStats(start, end) {
    return await fetch(`${getDevAPIBase()}/chancecubes/stats?start=${start}&end=${end}`).then(resp => {
        if (resp.status == 200)
            return resp.json();
        return {};
    });
}

export async function getChanceCubesRewardStatus() {
    return await fetch(`${getDevAPIBase()}/chancecubes/rewardstatus`).then(resp => {
        if (resp.status == 200)
            return resp.json();
        return { rewards: [], notes: [] };
    });
}

export async function userListUpdateUser(uuid, name, type, twitch) {
    return await fetch(`${getDevAPIBase()}/chancecubes/userlistedit`, getPostAuthParams({ uuid, name, type, twitch })).then(resp => {
        return resp.json();
    });
}

export async function userListAddUser(uuid, name, type, twitch) {
    return await fetch(`${getDevAPIBase()}/chancecubes/userlistadd`, getPostAuthParams({ uuid, name, type, twitch })).then(resp => {
        return resp.json();
    });
}

export async function userListDeleteUser(uuid) {
    return await fetch(`${getDevAPIBase()}/chancecubes/userlistdelete`, getPostAuthParams({ uuid })).then(resp => {
        return resp.json();
    });
}

