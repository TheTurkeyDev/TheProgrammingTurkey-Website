import { Anchor, Body1, Headline4 } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';
import { ProjectWrapper } from '../../components/project-wrapper';

const ListItem = styled.li`
    border-color: #131313;
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
                <ul className='list-group'>
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
                            <ListItem key={index} className='list-group-item bg-primary'>
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
