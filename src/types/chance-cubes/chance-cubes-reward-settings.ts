import { ChanceCubesSettingDefType } from './chance-cubes-setting-def';

export type ChanceCubesRewardSettings = {
    readonly Block: readonly ChanceCubesSettingDefType[]
    readonly Message: readonly ChanceCubesSettingDefType[]
    readonly Entity: readonly ChanceCubesSettingDefType[]
    readonly Experience: readonly ChanceCubesSettingDefType[]
    readonly Item: readonly ChanceCubesSettingDefType[]
    readonly Command: readonly ChanceCubesSettingDefType[]
    readonly Potion: readonly ChanceCubesSettingDefType[]
    readonly Sound: readonly ChanceCubesSettingDefType[]
    readonly Schematic: readonly ChanceCubesSettingDefType[]
    readonly Chest: readonly ChanceCubesSettingDefType[]
    readonly Particle: readonly ChanceCubesSettingDefType[]
    readonly Effect: readonly ChanceCubesSettingDefType[]
    readonly Title: readonly ChanceCubesSettingDefType[]
    readonly Area: readonly ChanceCubesSettingDefType[]
    readonly Status: readonly ChanceCubesSettingDefType[]
}