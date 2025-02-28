import { ChanceCubesRewardStatus } from '../types/chance-cubes/chance-cubes-reward-status';
import { ChanceCubesStats } from '../types/chance-cubes/chance-cubes-stats';
import { getDevAPIBase } from './network-helper';

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