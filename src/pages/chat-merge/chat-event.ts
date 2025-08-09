import { PlatformSubEvent, PlatformGiftSubEvent } from './platform-events';

export type ChatEvent = {
    readonly type: string,
    readonly data: PlatformSubEvent | PlatformGiftSubEvent
}