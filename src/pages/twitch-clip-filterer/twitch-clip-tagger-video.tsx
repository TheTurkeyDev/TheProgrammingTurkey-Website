import { ContainedButton, Loading } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';
import * as networkHelper from '../../network/network-helper';
import { TwitchClip } from '../../types/twitch-clip-filter/twitch-clip';

const LeftButton = styled(ContainedButton)`
    justify-self: right;
`;

const RightButton = styled(ContainedButton)`
    justify-self: left;
`;

const ClipRow = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 16px;
    align-items: center;
    justify-items: center;
`;

type TwitchClipVideoPlayerProps = {
    readonly loading: boolean
    readonly clips: readonly TwitchClip[]
    readonly clipIndex: number
    readonly setClipIndex: (val: ((index: number) => number)) => void
    readonly nextClip: () => void
}
export const TwitchClipVideoPlayer = ({ loading, clips, clipIndex, setClipIndex, nextClip }: TwitchClipVideoPlayerProps) => {
    const nextClicked = () => {
        if (clipIndex === clips.length - 1)
            nextClip();
        else
            setClipIndex(index => index + 1);
    };

    const prevClip = () => {
        if (clipIndex > 0)
            setClipIndex(index => index - 1);
    };

    if (clipIndex === -1)
        return <Loading />;

    if ((clips.length === 0 || clips.length === clipIndex) && loading)
        return <Loading />;

    if ((clips.length === 0 || clips.length === clipIndex) && !loading)
        return <span>No more videos!</span>;

    return (
        <ClipRow>
            <LeftButton disabled={clipIndex === 0} onClick={prevClip}>Prev</LeftButton>
            <iframe
                src={`https://clips.twitch.tv/embed?clip=${clips[clipIndex].id}&parent=${networkHelper.getSiteURLBase().replace('https://', '')}`}
                height='480'
                width='720'
                frameBorder='0'
                scrolling='no'
                allowFullScreen={true}>
            </iframe>
            <RightButton onClick={nextClicked}>Next</RightButton>
        </ClipRow>
    );
};