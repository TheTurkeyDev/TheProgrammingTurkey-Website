import { StreamAnimationUserDataPoint } from '../../../../types/stream-animations/stream-animation-user-data';

export type MappedStreamAnimationUserData = {
    readonly [key: string]: StreamAnimationUserData
}

export type StreamAnimationUserData = {
    readonly channel_point: StreamAnimationUserDataPoint
    readonly [key: string]: StreamAnimationUserDataPoint
}