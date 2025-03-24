import { YahooFantasyPlayerStatsStat } from './yahoo-fantasy-player-stats-stat';

export type YahooFantasyPlayerStats = {
    readonly coverageType: string
	readonly date: string
    readonly stats: readonly YahooFantasyPlayerStatsStat[]
}