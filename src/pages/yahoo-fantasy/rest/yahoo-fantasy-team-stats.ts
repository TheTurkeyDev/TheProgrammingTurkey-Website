import { YahooFantasyTeamStatsStat } from './yahoo-fantasy-team-stats-stat';

export type YahooFantasyTeamStats = {
    readonly coverageType: string
	readonly season: string
	readonly week: number
	readonly stats: readonly YahooFantasyTeamStatsStat[]
}