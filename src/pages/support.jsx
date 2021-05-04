import styled from 'styled-components';

const SupportWrapper = styled.div`
    max-width: 700px;
    display: grid;
    margin-left: auto;
    margin-right: auto;
    margin-top: 16px;
    gap: 16px;
`;

const HeaderWrapper = styled.h1`
    text-align: center;
`;

const PlatfromBadgeWrapper = styled.div`
    display: grid;
    grid-template-columns: 300px 300px;
    grid-template-rows: 50px 50px;
    gap: 16px;
`;

const PlatformsWrapper = styled.div`
    display: grid;
    gap: 32px;
    grid-template-columns: auto auto auto auto auto;
    justify-items: center;
    justify-self: center;
`;

const PlatformBadge = styled.a`
    padding-left: 8px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px;
    background-color:${props => props.color};
    border-radius: 3px;
    &:hover {
        text-decoration: none;
    }
`;

const SupportPlatformIcon = styled.i`
    font-size: 28px;
    color: white;
    align-self: center;
`;

const SupportPlatformText = styled.span`
    font-weight: bold;
    font-size: ${props => props.size || 28}px;
    color: white;
    align-self: center;
`;

const PlatformLink = styled.a`
    &:hover {
        text-decoration: none;
    }
`;

const PlatformIcon = styled.i`
    font-size: 64px;
    color: white;
`;

export const Support = () => {
    return (
        <SupportWrapper>
            <HeaderWrapper>Support Me</HeaderWrapper>
            <span>
                I appreciate you thinking about supporting me and my efforts! I love making things for all of you to use
                and I do my best to offer as much as I can for free!
            </span>
            <span>
                Right now, this server and website costs me about $15 a month to run. If you guys are able to cover that,
                it would make me very happy!
            </span>
            <span>
                Below is a list of ways you can support me, both monitarily and non-monitarily!
            </span>
            <PlatfromBadgeWrapper>
                <PlatformBadge className='anti-a-white' color={'#6441a5'} href='https://www.twitch.tv/turkeydev/subscribe'>
                    <SupportPlatformIcon className='fab fa-twitch' />
                    <SupportPlatformText>Subscribe</SupportPlatformText>
                </PlatformBadge>
                <PlatformBadge className='anti-a-white' color={'#f96854'} href='https://www.patreon.com/TurkeyDev'>
                    <SupportPlatformIcon className='fab fa-patreon' />
                    <SupportPlatformText size={22}>BECOME A PATREON</SupportPlatformText>
                </PlatformBadge>
                <PlatformBadge className='anti-a-white' color={'#333'} href='https://github.com/sponsors/TheTurkeyDev'>
                    <SupportPlatformIcon className='fab fa-github' />
                    <SupportPlatformText>Sponsor Me</SupportPlatformText>
                </PlatformBadge>
                <PlatformBadge className='anti-a-white' color={'#00457C'} href='https://paypal.me/turkeydev'>
                    <SupportPlatformIcon className='fab fa-paypal' />
                    <SupportPlatformText>Tip</SupportPlatformText>
                </PlatformBadge>
            </PlatfromBadgeWrapper>
            <span>
                Don't have any change to spare? No worries! Support me non-monitarily by following me and checking out my content below!
            </span>
            <PlatformsWrapper>
                <PlatformLink href='https://theturkey.dev/youtube'>
                    <PlatformIcon className='fab fa-youtube' />
                </PlatformLink>
                <PlatformLink href='https://theturkey.dev/twitch'>
                    <PlatformIcon className='fab fa-twitch' />
                </PlatformLink>
                <PlatformLink href='https://theturkey.dev/github'>
                    <PlatformIcon className='fab fa-github' />
                </PlatformLink>
                <PlatformLink href='https://theturkey.dev/twitter'>
                    <PlatformIcon className='fab fa-twitter' />
                </PlatformLink>
                <PlatformLink href='https://theturkey.dev/instagram'>
                    <PlatformIcon className='fab fa-instagram' />
                </PlatformLink>
            </PlatformsWrapper>
        </SupportWrapper>
    );
}