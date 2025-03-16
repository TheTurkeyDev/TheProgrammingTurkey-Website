import { YahooFantasyTeamLogos } from './yahoo-fantasy-team-logos';
import { YahooFantasyTeamManager } from './yahoo-fantasy-team-manager';
import { YahooFantasyTeamRoster } from './yahoo-fantasy-team-roster';
import { YahooFantasyTeamRosterAdds } from './yahoo-fantasy-team-roster-adds';

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
	readonly managers: YahooFantasyTeamManager
	readonly roster: YahooFantasyTeamRoster
}