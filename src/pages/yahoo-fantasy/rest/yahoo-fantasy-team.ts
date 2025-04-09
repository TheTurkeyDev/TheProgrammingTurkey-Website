import { YahooFantasyTeamLogos } from './yahoo-fantasy-team-logos';
import { YahooFantasyTeamManager } from './yahoo-fantasy-team-manager';
import { YahooFantasyTeamPoints } from './yahoo-fantasy-team-points';
import { YahooFantasyTeamProjectedPoints } from './yahoo-fantasy-team-projected-points';
import { YahooFantasyTeamRemainingGames } from './yahoo-fantasy-team-remaining-games';
import { YahooFantasyTeamRoster } from './yahoo-fantasy-team-roster';
import { YahooFantasyTeamRosterAdds } from './yahoo-fantasy-team-roster-adds';
import { YahooFantasyTeamStandings } from './yahoo-fantasy-team-standings';
import { YahooFantasyTeamStats } from './yahoo-fantasy-team-stats';

export type YahooFantasyTeam = {
	readonly teamKey: string
	readonly teamId: string
	readonly name: string
	readonly isOwnedByCurrentLogin: boolean
	readonly url: string
	readonly teamLogos: readonly YahooFantasyTeamLogos[]
	readonly waiverPriority: number
	readonly faabBalance: number
	readonly numberOfMoves: number
	readonly numberOfTrades: number
	readonly rosterAdds: YahooFantasyTeamRosterAdds
	readonly clinchedPlayoffs: boolean
	readonly leagueScoringType: string
	readonly hasDraftGrade: boolean
	readonly draftGrade: string
	readonly draftRecapURL: string
	readonly winProbability: number
	readonly isMatchupRecapAvailable: boolean
	readonly matchupRecapURL: string
	readonly matchupRecapTitle: string
	readonly managers: YahooFantasyTeamManager
	readonly roster: YahooFantasyTeamRoster
	readonly teamStats: YahooFantasyTeamStats
	readonly teamPoints: YahooFantasyTeamPoints
	readonly teamStandings: YahooFantasyTeamStandings
	readonly teamLiveProjectedPoints?: YahooFantasyTeamProjectedPoints
	readonly teamProjectedPoints: YahooFantasyTeamProjectedPoints
	readonly teamRemainingGames: YahooFantasyTeamRemainingGames
}