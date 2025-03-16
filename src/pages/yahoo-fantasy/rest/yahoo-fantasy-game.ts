import { YahooFantasyLeague } from './yahoo-fantasy-league';

export type YahooFantasyGame = {
    readonly gameKey: string
    readonly gameId: string
    readonly name: string
    readonly code: string
    readonly type: string
    readonly url: string
    readonly season: string
    readonly isRegistrationOver: boolean
    readonly isGameOver: boolean
    readonly isOffseason: boolean
    readonly leagues: readonly YahooFantasyLeague[]
}