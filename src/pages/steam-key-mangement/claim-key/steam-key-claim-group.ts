import { SteamKeyList } from '../steam-key-list';

export type SteamKeyClaimGroup = {
    readonly id: string
    readonly name: string
    readonly keyLists: readonly SteamKeyList[]
}