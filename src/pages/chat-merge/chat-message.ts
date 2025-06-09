import { Platform } from '../../types/platform';

export type ChatMessage = {
    readonly platform: Platform
    readonly type: string,
    readonly isMod: boolean,
    readonly timeStamp: string,
    readonly sender: string,
    readonly senderPlatformId: string,
    readonly senderColor: string
    readonly message: string,
    readonly payAmount: string
}