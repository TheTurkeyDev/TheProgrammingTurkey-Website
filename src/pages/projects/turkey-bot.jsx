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
            <p>
                TurkeyBot is a chat bot that allows for moderation of Twitch
                chats as well as provides helpful tools for the caster to
                use to allow for more efficiency.
            </p>
            <p>
                ** Disclaimer: This project is fairly old and has not been
                updated in some time. Because of this, not everything still
                works due to Twitch's internal changes of their endpoints.
                If you are looking for a smaller indie style bot, check out
                my friend
                <a href='' onClick={() => window.open('http://mjrbot.mjrlegends.com')}> MJR's chat moderation bot</a>
            </p>
            <h2>Some of these tools include:</h2>
            <div>
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
                        )
                    })}
                </ul>
            </div>
            <p>
                If you are using my bot in your chat let me know and I will
                be sure to stop by and say hello!
            </p>
        </ProjectWrapper>
    );
}
