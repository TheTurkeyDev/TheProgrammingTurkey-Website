import { ChanceCubesRewardNote } from './chance-cubes-reward-note';

export type ChanceCubesRewardStatus = {
    readonly rewards: readonly {
        readonly name: string,
        readonly version: string
        readonly status: string
        readonly chance: number
        readonly is_giant_cube_reward: boolean
    }[],
    readonly notes: readonly ChanceCubesRewardNote[]
}