import { MappedStreamAnimationUserData } from '../../pages/projects/stream-tools/animation-overlay/mapped-stream-animation-user-data';
import { TwitchChannelPointReward } from './twitch-channel-point-reward';

export type StreamAnimData = {
    readonly connected: boolean
    readonly token: string
    readonly channel_points: readonly TwitchChannelPointReward[]
    readonly animation_user_data: MappedStreamAnimationUserData
}