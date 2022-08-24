import { DiscordRoleOption } from './discord-role-option';

export type DiscordRolesGroup = {
    readonly id: string
    readonly server_name: string
    readonly server_id: string
    readonly channel_name: string
    readonly channel_id: string
    readonly name: string
    readonly description: string
    readonly message_id: string
    readonly roles: readonly DiscordRoleOption[]
}