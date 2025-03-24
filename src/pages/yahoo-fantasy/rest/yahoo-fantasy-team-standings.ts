import { YahooFantasyTeamStandingsOutcomeTotals } from './yahoo-fantasy-team-standings-outcome-totals';

export type YahooFantasyTeamStandings = {
    readonly rank: number
	readonly playoffSeed: number
	readonly outcomeTotals: YahooFantasyTeamStandingsOutcomeTotals
	readonly pointsFor: number
	readonly pointsAgainst: number
}