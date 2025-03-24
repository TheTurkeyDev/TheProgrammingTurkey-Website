import { YahooFantasyTeamRemainingGamesTotal } from './yahoo-fantasy-team-remaining-games-total';

export type YahooFantasyTeamRemainingGames = {
    readonly coverageType: string
    readonly week: number
    readonly total: YahooFantasyTeamRemainingGamesTotal
}