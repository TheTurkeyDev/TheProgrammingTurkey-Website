import { YahooFantasyPlayer } from './Yahoo-fantasy-player';
import { YahooFantasyTeamRosterMinimumGames } from './yahoo-fantasy-team-roster-minimum-games';

export type YahooFantasyTeamRoster = {
	readonly coverageType: string
	readonly date: string
	readonly isPrescoring: boolean
	readonly isEditable: boolean
	readonly minimumGames: YahooFantasyTeamRosterMinimumGames
	readonly players: readonly YahooFantasyPlayer[]
}