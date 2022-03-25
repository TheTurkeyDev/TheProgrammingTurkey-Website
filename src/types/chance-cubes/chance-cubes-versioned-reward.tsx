import { Mapped } from '../mapped';

export type CCVersionReward = {
    // eslint-disable-next-line functional/prefer-readonly-type
    [reward: string]: CCVersionedRewardData
}

export type CCVersionedRewardData = {
    readonly versions: Mapped
    readonly chance: number
    readonly isgcr: boolean
}