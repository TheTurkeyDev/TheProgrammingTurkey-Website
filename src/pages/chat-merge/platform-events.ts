import { Platform } from '../../types/platform';

export type PlatformSubEvent = {
	readonly platform: Platform
	readonly channel: string
	readonly channelPlatformId: string
	readonly subscriber: string
	readonly subscriberPlatformId: string
	readonly timeStamp: string
	readonly tier: string
	readonly isGift: boolean 
	readonly isResub: boolean 
}

export type PlatformGiftSubEvent = PlatformSubEvent & {
	readonly isAnonymous: boolean;
	readonly totalSubs: number
	readonly cumulativeTotalSubs: number
}