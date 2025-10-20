import { YahooFantasyLeagueStatCategories } from './yahoo-fantasy-league-stat-categories';

export type YahooFantasyLeagueSettings = {
    readonly draftType: string
    readonly isAuctionDraft: boolean
    readonly scoringType: string
    readonly usesPlayoff: boolean
    readonly hasPlayoffConsolationGames: boolean
    readonly usesPlayoffReseeding: boolean
    readonly usesLockEliminatedTeams: boolean
    readonly numPlayoffTeams: number
    readonly numPlayoffConsolationTeams: number
    readonly hasMultiweekChampionship: boolean
    readonly waiverType: string
    readonly waiverRule: string
    readonly usesFAAB: boolean
    readonly draftTime: number
    readonly draftPickTime: number
    readonly postDraftPlayers: string
    readonly maxTeams: number
    readonly waiverTime: number
    readonly tradeEndDate: string
    readonly tradeRatifyType: string
    readonly tradeRejectTime: number
    readonly playerPool: string
    readonly cantCutList: string
    readonly draftTogether: boolean
    readonly sendbirdChannelURL: string
    // rosterPositions: YahooFantasyLeagueRosterPosition[]
    readonly statCategories: YahooFantasyLeagueStatCategories
    // statModifiers: YahooFantasyLeagueStatModifiers
    readonly maxWeeklyAdds: number
    readonly usesMedianScore: boolean
    readonly leaguePremiumFeatures: string
    readonly minGamesPlayed: number
    readonly weekHasEnoughQualifyingDays: string
    readonly playoffStartWeek: number
    readonly usesRosterImport: boolean
    readonly rosterImportDeadline: string
    readonly isPubliclyViewable: boolean
    readonly pickemEnabled: boolean
    readonly usesFractionalPoints: boolean
    readonly usesNegativePoints: boolean
}