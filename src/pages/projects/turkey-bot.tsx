import { Anchor, Body1, Headline4 } from 'gobble-lib-react';
import styled from 'styled-components';
import { ProjectWrapper } from '../../components/project-wrapper';

const ListItem = styled.li`
    border: 1px solid #131313;
    border-radius: 3px;
    padding-top: 8px;
    padding-bottom: 8px;
    list-style-type: none;
`;

export const TurkeyBot = () => {
    return (
        <ProjectWrapper
            title='TurkeyBot'
            subTittle='A Twitch chat moderation bot'
            links={[
                { href: 'https://www.dropbox.com/s/y0xxgk2bod7t9fq/TurkeyBot%20v2.0.1%20Beta.jar?dl=0', text: 'Latest version' }
            ]}
            videos={[]}
        >
            <Body1>
                TurkeyBot is a chat bot that allows for moderation of Twitch
                chats as well as provides helpful tools for the caster to
                use to allow for more efficiency.
            </Body1>
            <Body1>
                ** Disclaimer: This project is fairly old and has not been
                updated in some time. Because of this, not everything still
                works due to Twitch's internal changes of their endpoints.
                If you are looking for a smaller indie style bot, check out
                my friend
                <Anchor href='http://mjrbot.mjrlegends.com' openInNewTab={true}> MJR's chat moderation bot</Anchor>
            </Body1>
            <Headline4>Some of these tools include:</Headline4>
            <Body1>
                <ul>
                    {[
                        'Commands',
                        'Auto-Announcements',
                        'Raffle system',
                        'Points system',
                        'Multi-response commands',
                        'Follower notification and tracker',
                        'Current viewer stats',
                        'Custom in channel bot name',
                        'Custom chat moderation',
                        'In-chat mini-games',
                    ].map((item, index) => {
                        return (
                            <ListItem key={index}>
                                {item}
                            </ListItem>
                        );
                    })}
                </ul>
            </Body1>
            <Body1>
                If you are using my bot in your chat let me know and I will
                be sure to stop by and say hello!
            </Body1>
        </ProjectWrapper>
    );
};
