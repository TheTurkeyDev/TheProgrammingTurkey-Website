import { Body1, Headline2, Headline5, TextHoverCss } from 'gobble-lib-react';
import styled from 'styled-components';
import { PlatformIcon } from './platform-icon';

const SupportWrapper = styled.div`
    max-width: 700px;
    display: grid;
    margin-left: auto;
    margin-right: auto;
    margin-top: 16px;
    gap: 16px;

    @media (max-width: 768px) {
        margin-inline: 16px;
    }
`;

const HeaderWrapper = styled(Headline2)`
    text-align: center;
`;

const PlatfromBadgeWrapper = styled.div`
    display: grid;
    grid-template-columns: 250px 250px;
    grid-template-rows: 50px 50px;
    gap: 16px;
    margin-inline: auto;

    @media (max-width: 768px) {
        grid-template-columns: 250px;
        grid-template-rows: 50px 50px 50px 50px;
    }
`;

const PlatformsWrapper = styled.div`
    display: grid;
    gap: 32px;
    grid-template-columns: auto auto auto auto auto;
    justify-items: center;
    justify-self: center;

    @media (max-width: 600px) {
        grid-template-columns: auto auto;
    }
`;

const PlatformBadge = styled.a`
    padding-left: 8px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px;
    background-color:${props => props.color};
    border-radius: 3px;
    ${TextHoverCss}
`;

const SupportPlatformIcon = styled.i`
    font-size: 28px;
    color: white;
    align-self: center;
`;

const SupportPlatformImage = styled.img`
    max-width: 28px;
    max-height: 28px;
    object-fit: contain;
    align-self: center;
`;

const SupportPlatformText = styled(Headline5)`
    font-weight: bold;
    color: white;
    align-self: center;
`;

export const Support = () => {
    return (
        <SupportWrapper>
            <HeaderWrapper>Support Me</HeaderWrapper>
            <Body1>
                I appreciate you thinking about supporting me and my efforts! I love making things for all of you to use
                and I do my best to offer as much as I can for free!
            </Body1>
            <Body1>
                Right now, this server and website costs me about $15 a month to run. If you guys are able to cover that,
                it would make me very happy!
            </Body1>
            <Body1>
                Below is a list of ways you can support me, both monitarily and non-monitarily!
            </Body1>
            <PlatfromBadgeWrapper>
                <PlatformBadge color='#6441a5' href='https://www.twitch.tv/turkeydev/subscribe'>
                    <SupportPlatformIcon className='fab fa-twitch' />
                    <SupportPlatformText>Subscribe</SupportPlatformText>
                </PlatformBadge>
                <PlatformBadge color='#00b9fe' href='https://ko-fi.com/H2H26OY2S'>
                    <SupportPlatformImage src='https://storage.ko-fi.com/cdn/cup-border.png' />
                    <SupportPlatformText>Support Me</SupportPlatformText>
                </PlatformBadge>
                <PlatformBadge color='#333' href='https://github.com/sponsors/TheTurkeyDev'>
                    <SupportPlatformIcon className='fab fa-github' />
                    <SupportPlatformText>Sponsor Me</SupportPlatformText>
                </PlatformBadge>
                <PlatformBadge color='#00457C' href='https://paypal.me/turkeydev'>
                    <SupportPlatformIcon className='fab fa-paypal' />
                    <SupportPlatformText>Tip</SupportPlatformText>
                </PlatformBadge>
            </PlatfromBadgeWrapper>
            <Body1>
                Don't have any change to spare? No worries! Support me non-monitarily by following me and checking out my content below!
            </Body1>
            <PlatformsWrapper>
                <PlatformIcon href='https://trky.dev/youtube' icon='fab fa-youtube' />
                <PlatformIcon href='https://trky.dev/twitch' icon='fab fa-twitch' />
                <PlatformIcon href='https://trky.dev/github' icon='fab fa-github' />
                <PlatformIcon href='https://trky.dev/twitter' icon='fab fa-twitter' />
                <PlatformIcon href='https://trky.dev/instagram' icon='fab fa-instagram' />
            </PlatformsWrapper>
        </SupportWrapper>
    );
};