export type DiscordRole = {
    readonly id: string
    readonly name: string
    readonly color: number
    readonly hoist: boolean
    readonly icon?: string
    readonly unicode_emoji?: string
    readonly position: number
    readonly permissions: string
    readonly managed: boolean
    readonly mentionable: boolean
    //public DiscordRoleTag tags;
}