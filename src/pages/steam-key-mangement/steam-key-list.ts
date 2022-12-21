import { SteamKey } from './steam-key';
import { SteamKeyServerRole } from './steam-key-server-role';

export type SteamKeyList = {
    readonly id: string
    readonly creator: string
    readonly title: string
    readonly serverRoles: readonly SteamKeyServerRole[]
    readonly keys: readonly SteamKey[]
}