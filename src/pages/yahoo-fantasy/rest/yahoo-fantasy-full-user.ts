import { YahooFantasyGame } from './yahoo-fantasy-game';

export type YahooFantasyFullUser = {
    readonly guid: string
    readonly games: readonly YahooFantasyGame[]
}