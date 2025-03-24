import { YahooFantasyPlayerStatsStatEnum } from './yahoo-fantasy-player-stats-stat-enum';

export type YahooFantasyPlayerStatsStat = {
    readonly statId: YahooFantasyPlayerStatsStatEnum
    readonly value: string
}