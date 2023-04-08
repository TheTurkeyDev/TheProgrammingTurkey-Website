import { RenderStatus } from './render-status';
import { VideoStatus } from './video-status';

export type VideoGenRender = {
    readonly id: string
    readonly display: string
    readonly creator: string
    readonly type: string
    readonly url: string
    readonly createdAt: string
    readonly status: RenderStatus
    readonly extendedStatus?: VideoStatus
}