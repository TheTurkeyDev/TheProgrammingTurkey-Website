import { YahooFantasyLeagueScoreboardMatchupStatWinner } from './yahoo-fantasy-league-scoreboard-matchup-stat-winner';
import { YahooFantasyTeam } from './yahoo-fantasy-team';

export type YahooFantasyLeagueScoreboardMatchup = {
    readonly week: number
    readonly weekStart: string
    readonly weekEnd: string
    readonly status: string
    readonly isPlayoffs: boolean
    readonly isConsolation: boolean
    readonly teams: readonly YahooFantasyTeam[]
    readonly statWinners: readonly YahooFantasyLeagueScoreboardMatchupStatWinner[];
}