import styled from 'styled-components';

const RowWrapper = styled.div`
    max-width: 700px;
`;

const PlatformBadge = styled.a`
    min-width: 300px;
    max-width: 300px;
    min-height: 50px;
    height: 50px;
    background-color:${props => props.color};
`;

const SupportPlatformIcon = styled.i`
    font-size: 28px;
    color: white;
`;

const SupportPlatformText = styled.span`
    font-weight: bold;
    font-size: ${props => props.size || 28}px;
    color: white;
`;

const PlatformLink = styled.a`
    color: white;
    text-decoration: none;
`;

const PlatformIcon = styled.i`
    font-size: 64px;
    color: white;
`;

export const Support = () => {
    return (
        <div className='m-3'>
            <div className='text-center'>
                <h1>Support Me</h1>
            </div>
            <div className='m-3 fluid-container'>
                <RowWrapper className='row mx-auto'>
                    <p>
                        I appreciate you thinking about supporting me and my efforts! I love making things for all of you to use
                        and I do my best to offer as much as I can for free!
                    </p>
                    <p>
                        Right now, this server and service costs me about $5 a month to run. If you guys are able to cover that, than
                        I can garuntee that this service will stay online for essentailly forever!
                    </p>
                    <p>
                        Below is a list of ways you can support me, both monitarily and non-monitarily!
                    </p>
                </RowWrapper>
                <RowWrapper className='row mx-auto'>
                    <PlatformBadge className='col mr-1 mt-2 mx-auto anti-a-white' color={'#6441a5'} href='https://www.twitch.tv/turkeydev/subscribe'>
                        <div className='fluid-container row h-100'>
                            <div className='col-auto my-auto ml-3'>
                                <SupportPlatformIcon className='fab fa-twitch' />
                            </div>
                            <div className='col p-0 my-auto mx-auto'>
                                <SupportPlatformText>Subscribe</SupportPlatformText>
                            </div>
                        </div>
                    </PlatformBadge>
                    <PlatformBadge className='col mr-1 mt-2 mx-auto anti-a-white' color={'#f96854'} href='https://www.patreon.com/TurkeyDev'>
                        <div className='fluid-container row h-100'>
                            <div className='col-auto my-auto ml-3'>
                                <SupportPlatformIcon className='fab fa-patreon' />
                            </div>
                            <div className='col p-0 my-auto mx-auto'>
                                <SupportPlatformText size={22}>BECOME A PATREON</SupportPlatformText>
                            </div>
                        </div>
                    </PlatformBadge>
                    <PlatformBadge className='col mr-1 mt-2 mx-auto anti-a-white' color={'#333'} href='https://github.com/sponsors/TheTurkeyDev'>
                        <div className='fluid-container row h-100'>
                            <div className='col-auto my-auto ml-3'>
                                <SupportPlatformIcon className='fab fa-github' />
                            </div>
                            <div className='col p-0 my-auto mx-auto'>
                                <SupportPlatformText>Sponsor Me</SupportPlatformText>
                            </div>
                        </div>
                    </PlatformBadge>
                    <PlatformBadge className='col mr-1 mt-2 mx-auto anti-a-white' color={'#00457C'} href='https://paypal.me/turkey2349'>
                        <div className='fluid-container row h-100'>
                            <div className='col-auto my-auto ml-3'>
                                <SupportPlatformIcon className='fab fa-paypal' />
                            </div>
                            <div className='col p-0 my-auto mx-auto'>
                                <SupportPlatformText>Donate</SupportPlatformText>
                            </div>
                        </div>
                    </PlatformBadge>
                </RowWrapper>
                <RowWrapper className='row mt-3 mx-auto'>
                    <p>
                        Don't have any change to spare? No worries! Support me non-monitarily by following me and checking out my content below!
                    </p>
                </RowWrapper>
                <RowWrapper className='row mt-3 mx-auto'>
                    <PlatformLink className='col' href='https://theturkey.dev/youtube'>
                        <PlatformIcon className='fab fa-youtube' />
                    </PlatformLink>
                    <PlatformLink className='col' href='https://theturkey.dev/twitch'>
                        <PlatformIcon className='fab fa-twitch' />
                    </PlatformLink>
                    <PlatformLink className='col' href='https://theturkey.dev/github'>
                        <PlatformIcon className='fab fa-github' />
                    </PlatformLink>
                    <PlatformLink className='col' href='https://theturkey.dev/twitter'>
                        <PlatformIcon className='fab fa-twitter' />
                    </PlatformLink>
                    <PlatformLink className='col' href='https://theturkey.dev/instagram'>
                        <PlatformIcon className='fab fa-instagram' />
                    </PlatformLink>
                </RowWrapper>
            </div>
        </div>
    );
}