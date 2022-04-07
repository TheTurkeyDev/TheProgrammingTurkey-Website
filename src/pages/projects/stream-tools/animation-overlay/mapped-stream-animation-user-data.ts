import { StreamAnimationUserDataPoint } from '../../../../types/stream-animations/stream-animation-user-data';

export type StreamAnimationUserData = {
    readonly [key: string]: UserAnimationSettings
}

export type UserAnimationSettings = {
    readonly channel_point: StreamAnimationUserDataPoint
    readonly [key: string]: StreamAnimationUserDataPoint
}