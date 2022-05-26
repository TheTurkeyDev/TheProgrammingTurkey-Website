import { Body1, Headline5 } from 'gobble-lib-react';
import styled from 'styled-components';
import { ProjectWrapper } from '../../../../components/project-wrapper';

const ImageWrapper = styled.img`
    justify-self: center;
`;

const TwitchUserWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 8px;
`;

const TwitchIcon = styled.i`
    color: #9146FF;
    font-size: 24px;
    align-self: center;
    justify-self: right;
`;

const TwitchUsername = styled.span`
    font-size: 24px;
    justify-self: left;
`;

export const YouTubeSubCount = () => {
    return (
        <ProjectWrapper
            title='YouTube Sub Counter'
            subTittle='OBS Overlay'
            links={[]}
            videos={[]}
        >
            <Body1>
                YouTube Sub Count is an overlay that allows streamers to add their YouTube subscriber count to their stream!
                This tool is currently under restricted access, but if this is something you are interested in using/ trying out,
                please reach out to @turkeydev!
            </Body1>
            <Body1>
                Display font color, and size 100% customizable! Due to YouTube limitations, only the 3 most significant
                digits of the sub count is displayed.
            </Body1>
            <Headline5>Examples</Headline5>
            <TwitchUserWrapper>
                <TwitchIcon className='fab fa-twitch' />
                <TwitchUsername>TurkeyDev</TwitchUsername>
            </TwitchUserWrapper>
            <ImageWrapper loading='lazy' src='/images/yt_sub_count_turkeydev_ex.png' width='720' height='auto' />
            <TwitchUserWrapper>
                <TwitchIcon className='fab fa-twitch' />
                <TwitchUsername>Deadpine</TwitchUsername>
            </TwitchUserWrapper>
            <ImageWrapper loading='lazy' src='/images/yt_sub_count_deadpine_ex.png' width='720' height='auto' />
        </ProjectWrapper>
    );
};
