export type DiscordRoleOption = {
	readonly id: string
	readonly label: string
	readonly roles: readonly string[]
	readonly description: string
    readonly default: boolean
}