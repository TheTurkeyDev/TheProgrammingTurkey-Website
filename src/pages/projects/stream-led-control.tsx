import { Body1, Headline5, HorizontalRule } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';
import { ProjectWrapper } from '../../components/project-wrapper';

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

export const StreamLEDControl = () => {
    return (
        <>
            <ProjectWrapper
                title='Twitch Chat Controlled LED Strip'
                subTittle=''
                links={[
                    { href: 'https://github.com/TheTurkeyDev/LED-Strip-Stream-Integration', text: 'Source Code' }
                ]}
                videos={[
                    { title: 'Video about how I made the Stream Controlled LED Strip', url: '0M-tHoVeetI' }
                ]}
            >
                <Body1>
                    The LED's you see in the background of my stream are fully
                    controllable by my Twitch chat! Below you will find all the
                    ways in which you can controll the led strip as well as
                    other information about the project
                </Body1>
            </ProjectWrapper>
            <SectionsWrapper className='mt-3 mx-auto text-left'>
                <HorizontalRule />
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
                <HorizontalRule />
                <div className='mt-3'>
                    <div className='text-center'>
                        <Headline5 className='mx-auto'>Solid Color</Headline5>
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
                <HorizontalRule />
                <div className='mt-3'>
                    <div className='text-center'>
                        <Headline5 className='mx-auto'>Rainbow</Headline5>
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
                <HorizontalRule />
                <div className='mt-3'>
                    <div className='text-center'>
                        <Headline5 className='mx-auto'>Color Blocks</Headline5>
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
                <HorizontalRule />
                <div className='mt-3'>
                    <div className='text-center'>
                        <Headline5 className='mx-auto'>Alternating Colors</Headline5>
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
                <HorizontalRule />
                <div className='mt-3'>
                    <div className='text-center'>
                        <Headline5 className='mx-auto'>Police</Headline5>
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
        </>
    );
};
