import { ScoreboardData } from './scoreboard-data';

export type ScoreboardGenData = {
    readonly width: number
    readonly height: number
    readonly videoSegments: readonly ScoreboardData[]
}