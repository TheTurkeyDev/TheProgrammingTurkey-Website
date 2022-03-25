import { Body1, Headline4 } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';
import { ProjectWrapper } from '../../components/project-wrapper';
import { ExtLink } from '../../styles/common-styles';

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
`;
export const GGServer = () => {
    return (
        <ProjectWrapper
            title='GGServer'
            subTittle='(Gobble Google Server) A Google FCM Server'
            links={[]}
            videos={[]}
        >
            <ContentWrapper>
                <Body1>
                    GGServer is server tool that allows the creation of services
                    that can be loaded into the server to preform tasks or
                    services that are able to utilize googles cloud messaging.
                </Body1>
                <Headline4>Current Working example:</Headline4>
                <Body1>
                    I currently have an instance of GGServer running on a
                    raspberry pi that has several services loaded. One is a
                    Twitch bot that sits in serval channels that I frequent. The
                    bot, or service, listens for certain key words and when one
                    of the is said, the service usese GGServer to relay a
                    message and notification to an app that I have build for my
                    phone (Which uses Google FCM) so that I recieve the
                    notification and details of what was said.
                </Body1>
                <ExtLink href='https://github.com/TheTurkeyDev/GGServer'>
                    GGServer Repository
                </ExtLink>
                <ExtLink href='https://github.com/TheTurkeyDev/TurkeyBot-Lurk'>
                    Twitch Service Repository
                </ExtLink>
                <ExtLink href='https://github.com/TheTurkeyDev/TurkeyBot-Reddit'>
                    Reddit Comment Scanner Repository
                </ExtLink>
                <Body1>If this project gains popularity I'll add more here.</Body1>
            </ContentWrapper>
        </ProjectWrapper>
    );
};
