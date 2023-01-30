import { Body1, ButtonText } from 'gobble-lib-react';
import { Icon } from '../../../components/icon';
import { VideoGenRender } from './video-gen-render-data';

type VideoGenVideoProps = {
    readonly video: VideoGenRender
}

export const VideoGenVideo = ({ video }: VideoGenVideoProps) => {

    return (
        <>
            <Body1>{video.display}</Body1>
            <Body1>{video.creator}</Body1>
            <Body1>{video.type}</Body1>
            <Body1>{video.createdAt}</Body1>
            <a href={video.url} download>
                <Icon name='fas fa-download' />
            </a>
        </>
    );

};