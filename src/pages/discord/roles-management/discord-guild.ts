import { DiscordChannel } from './discord-channel';

export type DiscordGuild = {
    readonly id: string
    readonly name: string
    readonly icon: string
    readonly icon_hash: string
    readonly ownerId: string
    readonly unavailable: boolean
    readonly channels: readonly DiscordChannel[]
}