import styled from 'styled-components';
import { PageWrapper } from '../base/page-wrapper';

const Rule = styled.hr`
    border-color:#757c85;
`;

const SectionsWrapper = styled.div`
    max-width: 500px;
`;

const Code = styled.p`
    background-color: #121212 !important;
    color: #cc11cc;
    margin-top: 3px;
`;

const FontMed = styled.span`
    font-size: 18px;
`;

const Video = styled.iframe`
    border: 2px solid #d1d1d1;
`;

export const StreamLEDControl = () => {
    return (
        <PageWrapper>
            <div className='text-center mr-5 ml-5'>
                <h1 className='mt-2'>Twitch Chat Controlled LED Strip</h1>
                <p>
                    The LED's you see in the background of my stream are fully
                    controllable by my Twitch chat! Below you will find all the
                    ways in which you can controll the led strip as well as
                    other information about the project
                </p>
                <div className='mt-3'>
                    <h4>
                        Video about how I made the Stream Controlled LED Strip
                    </h4>
                    <Video
                        width='560'
                        height='315'
                        src='https://www.youtube.com/embed/0M-tHoVeetI'
                        frameBorder='0'
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                    ></Video>
                </div>
                <div>
                    <a
                        className='ml-1 mr-1'
                        href=''
                        onClick={() =>
                            window.open(
                                'https://github.com/TheTurkeyDev/LED-Strip-Stream-Integration'
                            )
                        }
                    >
                        Source Code
                    </a>
                </div>
                <Rule />
                <h2 className='mt-5 font-weight-bold'>
                    Controlling the LED strip
                </h2>
                <SectionsWrapper className='mt-3 mx-auto text-left'>
                    <Rule />
                    <div className='mt-3'>
                        <div className='ml-2 w-100 h-100'>
                            <FontMed>
                                Valid Colors:
                            </FontMed>
                            <Code className='p-3'>
                                red, blue, green, yellow, orange, pink, purple,
                                cyan, white, black
                            </Code>
                        </div>
                    </div>
                    <Rule />
                    <div className='mt-3'>
                        <div className='text-center'>
                            <h4 className='mx-auto'>Solid Color</h4>
                        </div>
                        <div className='ml-2 w-100 h-100'>
                            <FontMed>
                                Syntax:
                            </FontMed>
                            <Code className='p-3'>
                                [Hex/ Color]
                            </Code>
                            <FontMed>
                                Examples:
                            </FontMed>
                            <Code className='p-3'>
                                #FF0000
                            </Code>
                            <Code className='p-3'>
                                red
                            </Code>
                        </div>
                    </div>
                    <Rule />
                    <div className='mt-3'>
                        <div className='text-center'>
                            <h4 className='mx-auto'>Rainbow</h4>
                        </div>
                        <div className='ml-2 w-100 h-100'>
                            <FontMed>
                                Syntax:
                            </FontMed>
                            <Code className='p-3'>
                                rainbow
                            </Code>
                        </div>
                    </div>
                    <Rule />
                    <div className='mt-3'>
                        <div className='text-center'>
                            <h4 className='mx-auto'>Color Blocks</h4>
                        </div>
                        <div className='ml-2 w-100 h-100'>
                            <FontMed>
                                Syntax:
                            </FontMed>
                            <Code className='p-3'>
                                colorblocks [Hex /Color] (...Repeat as much as
                                desired)
                            </Code>
                            <FontMed>
                                Examples:
                            </FontMed>
                            <Code className='p-3'>
                                colorblocks #FF0000 #00FF00 #0000FF
                            </Code>
                            <Code className='p-3'>
                                colorblocks #FF0000 #00FF00 #0000FF #FFFF00
                                #00FFFF
                            </Code>
                            <Code className='p-3'>
                                colorblocks red #00FF00 blue orange #00FFFF
                            </Code>
                        </div>
                    </div>
                    <Rule />
                    <div className='mt-3'>
                        <div className='text-center'>
                            <h4 className='mx-auto'>Alternating Colors</h4>
                        </div>
                        <div className='ml-2 w-100 h-100'>
                            <FontMed>
                                Syntax:
                            </FontMed>
                            <Code className='p-3'>
                                coloralternate [Hex /Color] (...Repeat as much
                                as desired)
                            </Code>
                            <FontMed>
                                Examples:
                            </FontMed>
                            <Code className='p-3'>
                                coloralternate #FF0000 #00FF00 #0000FF
                            </Code>
                            <Code className='p-3'>
                                coloralternate #FF0000 #00FF00 #0000FF #FFFF00
                                #00FFFF
                            </Code>
                            <Code className='p-3'>
                                coloralternate red #00FF00 blue orange #00FFFF
                            </Code>
                        </div>
                    </div>
                    <Rule />
                    <div className='mt-3'>
                        <div className='text-center'>
                            <h4 className='mx-auto'>Police</h4>
                        </div>
                        <div className='ml-2 w-100 h-100'>
                            <FontMed>
                                Syntax:
                            </FontMed>
                            <Code className='p-3'>
                                police
                            </Code>
                        </div>
                    </div>
                </SectionsWrapper>
            </div>
        </PageWrapper >
    );
}
