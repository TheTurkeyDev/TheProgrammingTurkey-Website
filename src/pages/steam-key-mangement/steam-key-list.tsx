import { SteamKey } from './steam-key';

export type SteamKeyList = {
    readonly id: string
    readonly creator: string
    readonly title: string
    readonly discord_server: string
    readonly discord_role: string
    readonly keys: readonly SteamKey[]
}