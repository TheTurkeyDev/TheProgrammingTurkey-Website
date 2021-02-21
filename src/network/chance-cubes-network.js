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
