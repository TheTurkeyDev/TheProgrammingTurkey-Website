import { ChanceCubesRewardDependency } from '../../pages/chance-cubes/reward-builder/chance-cubes-reward-dependency';

export type ChanceCubesRewardType = {
    readonly chance: number
    readonly isGiantCubeReward: boolean
    readonly dependencies: ChanceCubesRewardDependency
}