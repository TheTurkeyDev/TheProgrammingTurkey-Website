import { ChanceCubesRewardSetting } from '../types/chance-cubes/chance-cubes-reward-setting';
import { CCContentCreator } from '../types/chance-cubes/chance-cubes-content-creator';
import { ChanceCubesRewardStatus } from '../types/chance-cubes/chance-cubes-reward-status';
import { ChanceCubesStats } from '../types/chance-cubes/chance-cubes-stats';
import { getParams, getPostAuthParams } from './auth-network';
import { getDevAPIBase } from './network-helper';
import { RestResponseWrapper } from '../types/rest-response-wrapper';

export async function getChanceCubesStats(start: string, end: string): Promise<ChanceCubesStats> {
    return await fetch(`${getDevAPIBase()}/chancecubes/stats?start=${start}&end=${end}`).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return undefined;
    });
}

export async function getChanceCubesRewardStatus(): Promise<ChanceCubesRewardStatus> {
    return await fetch(`${getDevAPIBase()}/chancecubes/rewardstatus`).then(resp => {
        if (resp.status === 200)
            return resp.json();
        return { rewards: [], notes: [] };
    });
}

export async function userListUpdateUser(user: CCContentCreator) {
    return await fetch(`${getDevAPIBase()}/chancecubes/userlistedit`, getPostAuthParams({ uuid: user.UUID, name: user.Name, type: user.Type, twitch: user.Twitch })).then(resp => {
        return resp.json();
    });
}

export async function userListAddUser(user: CCContentCreator) {
    return await fetch(`${getDevAPIBase()}/chancecubes/userlistadd`, getPostAuthParams({ uuid: user.UUID, name: user.Name, type: user.Type, twitch: user.Twitch })).then(resp => {
        return resp.json();
    });
}

export async function userListDeleteUser(uuid: string) {
    return await fetch(`${getDevAPIBase()}/chancecubes/userlistdelete`, getPostAuthParams({ uuid })).then(resp => {
        return resp.json();
    });
}

export async function getRewardSettings(rewardId: string): Promise<RestResponseWrapper<readonly ChanceCubesRewardSetting[]>> {
    return await fetch(`${getDevAPIBase()}/chancecubes/rewardsettings?rewardId=${rewardId}`, getParams).then(resp => {
        return resp.json();
    });
}


export async function saveReward(rewardName: string, chance: number, isGiantCC: boolean, status: readonly { readonly game_version: string, readonly status: number }[]) {
    return await fetch(`${getDevAPIBase()}/chancecubes/updatereward`, getPostAuthParams({
        name: rewardName,
        chance,
        is_giant_cube_reward: isGiantCC,
        status: status
    })).then(resp => {
        return resp.json();
    });
}

export async function createReward(rewardName: string, chance: number, isGiantCC: boolean) {
    return await fetch(`${getDevAPIBase()}/chancecubes/addreward`, getPostAuthParams({
        name: rewardName,
        chance,
        is_giant_cube_reward: isGiantCC
    })).then(resp => {
        return resp.json();
    });
}

