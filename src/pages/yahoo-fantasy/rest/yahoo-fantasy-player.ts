import { YahooFantasyPlayerHeadshot } from './yahoo-fantasy-player-headshot';
import { YahooFantasyPlayerKeeper } from './yahoo-fantasy-player-keeper';
import { YahooFantasyPlayerName } from './yahoo-fantasy-player-name';
import { YahooFantasyPlayerPoints } from './yahoo-fantasy-player-points';
import { YahooFantasyPlayerSelectedPosition } from './yahoo-fantasy-player-selected-position';
import { YahooFantasyPlayerStartingStatus } from './yahoo-fantasy-player-starting-status';
import { YahooFantasyPlayerStats } from './yahoo-fantasy-player-stats';

export type YahooFantasyPlayer = {
    readonly playerKey: string
    readonly playerId: string
    readonly name: YahooFantasyPlayerName
    readonly url: string
    readonly status?: string
    readonly statusFull?: string
    readonly headshot: YahooFantasyPlayerHeadshot
    readonly editorialPlayerKey: string
    readonly editorialTeamKey: string
    readonly editorialTeamURL: string
    readonly editorialTeamFullName: string
    readonly editorialteamAbbr: string
    readonly uniformNumber: string
    readonly primaryPosition: string
    readonly eligiblePositions: readonly string[]
    readonly eligiblePositionsToAdd: readonly string[]
    readonly selectedPosition: YahooFantasyPlayerSelectedPosition;
    readonly displayPosition: string
    readonly imageURL: string
    readonly isUndroppable: boolean
    readonly isKeeper: YahooFantasyPlayerKeeper
    readonly positionType: string
    readonly hasPlayerNotes: boolean
    readonly playerNotesLastTimestamp: number
    readonly hasRecentPlayerNotes: boolean
    readonly injuryNote: string
    readonly isFlex: boolean
    readonly isEditable: boolean
    readonly startingStatus?: YahooFantasyPlayerStartingStatus;
    readonly playerStats: YahooFantasyPlayerStats
    readonly playerPoints: YahooFantasyPlayerPoints
}