import { Body1, Icon } from 'gobble-lib-react';
import { RenderStatus } from './render-status';
import { VideoGenRender } from './video-gen-render-data';
import { VideoGenVideoRenderingStatus } from './video-gen-video-rendering-status';

type VideoGenVideoProps = {
    readonly video: VideoGenRender
    readonly updateStatus: (state: VideoGenRender) => void
}

export const VideoGenVideo = ({ video, updateStatus }: VideoGenVideoProps) => {

    return (
        <>
            <Body1>{video.display}</Body1>
            <Body1>{video.creator}</Body1>
            <Body1>{video.type}</Body1>
            <Body1>{video.createdAt}</Body1>
            {
                video.status === RenderStatus.COMPLETE ?
                    <a href={video.url} download>
                        <Icon className='fas fa-download' />
                    </a> : (
                        video.status === RenderStatus.RENDERING || video.status === RenderStatus.NOT_STARTED ?
                            <VideoGenVideoRenderingStatus id={video.id} updateStatus={updateStatus} /> : (
                                video.status === RenderStatus.ERRORED ?
                                    <div><Icon className='fas fa-exclamation-triangle' /><Body1>Error!</Body1></div> :
                                    <Body1>{video.status}</Body1>
                            )
                    )
            }

        </>
    );

};