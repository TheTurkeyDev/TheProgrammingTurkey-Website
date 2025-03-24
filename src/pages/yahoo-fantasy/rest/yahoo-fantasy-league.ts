import { YahooFantasyLeagueScoreboard } from './yahoo-fantasy-league-scoreboard';
import { YahooFantasyTeam } from './yahoo-fantasy-team';

export type YahooFantasyLeague = {
    readonly leagueKey: string
    readonly leagueId: string
    readonly name: string
    readonly url: string
    readonly logoURL: string
    readonly draftStatus: string
    readonly numTeams: number
    readonly editKey: number
    readonly leagueUpdateTimestamp: number
    readonly scoringType: string
    readonly leagueType: string
    readonly renew: string
    readonly renewed: string
    readonly feloTier: string
    readonly allowAddToDlExtraPos: boolean
    readonly isProLeague: boolean
    readonly isCashLeague: boolean
    readonly currentWeek: number
    readonly startWeek: number
    readonly startDate: string
    readonly endWeek: number
    readonly endDate: string
    readonly isFinished: boolean
    readonly isPlusLeague: boolean
    readonly gameCode: string
    readonly season: string
    readonly teams: readonly YahooFantasyTeam[]
    // readonly settings: YahooFantasyLeagueSettings
    readonly standings: {readonly standings: readonly YahooFantasyTeam[]}
    readonly scoreboard: YahooFantasyLeagueScoreboard
}