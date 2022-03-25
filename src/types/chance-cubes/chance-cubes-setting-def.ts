
export type ChanceCubesSettingDefType = ChanceCubesNumberSettingDef | ChanceCubesDecimalSettingDef | ChanceCubesTextSettingDef | ChanceCubesBooleanSettingDef

export type ChanceCubesSettingDef = {
    readonly key: string
    readonly display: string
    readonly description: string
}

export type ChanceCubesNumberSettingDef = ChanceCubesSettingDef & {
    readonly type: 'number'
    readonly default: number
    readonly min?: number
    readonly max?: number
}

export type ChanceCubesDecimalSettingDef = ChanceCubesSettingDef & {
    readonly type: 'decimal'
    readonly default: number
    readonly min?: number
    readonly max?: number
}

export type ChanceCubesTextSettingDef = ChanceCubesSettingDef & {
    readonly type: 'text'
    readonly default: string
}

export type ChanceCubesBooleanSettingDef = ChanceCubesSettingDef & {
    readonly type: 'boolean'
    readonly default: boolean
}