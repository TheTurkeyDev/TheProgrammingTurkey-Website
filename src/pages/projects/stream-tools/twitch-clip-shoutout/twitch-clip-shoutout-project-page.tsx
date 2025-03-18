import { Body1 } from 'gobble-lib-react';
import { ContainedList, ContainedListItem } from '../../../../components/contained-list';
import { ProjectWrapper } from '../../../../components/project-wrapper';

export const TwitchClipShoutoutProjectPage = () => {
    return (
        <ProjectWrapper
            title='Twitch Clip Shoutout'
            subTittle=''
            links={[
                { href: '/twitch-clip-shoutout', text: 'Setup Overlay' }
            ]}
            videos={[]}
        >
            <Body1>
                OBS overlay that allows you to display randomly selected clips from a desired channel on your stream! 
                Simply follow the "Setup Overlay" button at the bottom of this page to get started!
            </Body1>
            <ContainedList title='Triggers' gap={4}>
                <ContainedListItem>
                    <Body1>Command: !so (channelName)</Body1>
                </ContainedListItem>
                <ContainedListItem>
                    <Body1>Channel Point Redemption</Body1>
                </ContainedListItem>
                <ContainedListItem>
                    <Body1>When shouting out a channel natively on Twitch</Body1>
                </ContainedListItem>
            </ContainedList>
        </ProjectWrapper>
    );
};