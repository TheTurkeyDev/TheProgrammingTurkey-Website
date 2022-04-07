export type ChanceCubesStats = {
    readonly dates: readonly string[]
    readonly versions: ChanceCubesVersions
    readonly mc_versions: MCVersion
    readonly total_runs_last_month: number
    readonly total_days: number
    readonly total_runs: number
    readonly most_date: string
    readonly most: number
    readonly daily_totals: readonly ChanceCubesStatsDayTotal[]
    readonly weekly_totals: readonly number[]
    readonly monthly_totals: readonly number[]
}

export type MCVersion = {
    readonly [version: string]: readonly number[]
}

export type ChanceCubesVersions = {
    readonly [key: string]: readonly number[]
}

export type ChanceCubesStatsDayTotal = {
    readonly days: number
    readonly total: number
}