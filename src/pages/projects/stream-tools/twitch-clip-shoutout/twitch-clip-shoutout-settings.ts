import { TwitchChatRoleLevel } from './twitch-chat-role-level';

export type TwitchClipShoutoutSettings = {
    readonly hasTwitchAccount: boolean
    readonly enabled: boolean
    readonly hasScopes: boolean
    readonly token: string | null
    readonly usageControl: TwitchChatRoleLevel
    readonly minLength: number
    readonly maxLength: number
    readonly fetchMessage: string
    readonly animationDirection: number
}