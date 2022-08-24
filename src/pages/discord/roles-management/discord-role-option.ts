export type DiscordRoleOption = {
	readonly role_group_id: string
	readonly id: string
	readonly label: string
	readonly roles: readonly string[]
	readonly description: string
    readonly default: boolean
}