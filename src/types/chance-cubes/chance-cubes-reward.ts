/* eslint-disable functional/prefer-readonly-type */
import { ChanceCubesRewardDependency } from '../../pages/chance-cubes/reward-builder/chance-cubes-reward-dependency';
import { Mapped } from '../mapped';

export type ChanceCubesRewardType = {
    readonly chance: number
    readonly isGiantCubeReward: boolean
    readonly dependencies: ChanceCubesRewardDependency
    readonly Block?: Mapped[]
    readonly Message?: Mapped[]
    readonly Entity?: Mapped[]
    readonly Experience?: Mapped[]
    readonly Item?: Mapped[]
    readonly Command?: Mapped[]
    readonly Potion?: Mapped[]
    readonly Sound?: Mapped[]
    readonly Schematic?: Mapped[]
    readonly Chest?: Mapped[]
    readonly Particle?: Mapped[]
    readonly Effect?: Mapped[]
    readonly Title?: Mapped[]
    readonly Area?: Mapped[]
    readonly Status?: Mapped[]

}