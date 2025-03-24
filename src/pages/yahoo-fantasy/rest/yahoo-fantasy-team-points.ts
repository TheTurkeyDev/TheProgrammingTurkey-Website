import { YahooFantasyTeamStatsStat } from './yahoo-fantasy-team-stats-stat';

export type YahooFantasyTeamPoints = {
    readonly coverageType: string
    readonly season: string
    readonly week: number
    readonly total: string
    readonly stats: readonly YahooFantasyTeamStatsStat[]
}