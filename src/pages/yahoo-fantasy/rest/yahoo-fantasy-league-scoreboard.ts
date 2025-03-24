import { YahooFantasyLeagueScoreboardMatchup } from './yahoo-fantasy-league-scoreboard-matchup';

export type YahooFantasyLeagueScoreboard = {
    readonly week: number
    readonly matchups: readonly YahooFantasyLeagueScoreboardMatchup[];
}