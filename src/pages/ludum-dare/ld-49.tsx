import { Body1 } from '@theturkeydev/gobble-lib-react';
import { ProjectWrapper } from '../../components/project-wrapper';

export const LD49 = () => {
    return (
        <ProjectWrapper
            title='The Virus'
            subTittle='For LudumDare 49!'
            links={[
                { href: 'https://ldjam.com/events/ludum-dare/49/the-virus', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare49', text: 'Source Code' }
            ]}
            videos={[
                // { title: 'Devlog', url: 'GAtzLFWUQjw' },
                { title: 'TimeLapse', url: 'YFlnv5HML10' },
            ]}
        >
            <Body1>
                This game requires Java 8 to run!
            </Body1>
            <Body1>
                Your friend has asked you to take a look at his computer and OH BOY it is a mess. A Virus seems to have run a muck on it and the whole system is completely unstable and does not run well at all. You now have been tasked to clean up the after math….
            </Body1>
            <Body1>
                This game utilizes both traditional UI’s and the physical file system. The Initial UI that appears is the helper UI that you use to specify where you want the files from “your friends computer” to go as well as to to show what Tasks you have left to complete. If you hover over the tasks, some helpful tool tip text will appear to give you a slight hint as to what the task needs to be completed.
            </Body1>
            <Body1>
                To run the game, simply download the zip file and extract the contents. Go into the bin folder and run the executable that corresponds with your OS.
            </Body1>
            <Body1>
                No, there is no real virus in this game. It’s all for show! I like taking different approaches to making games instead of using traditional game engines and this is what I came up with this time.
            </Body1>
            <Body1>
                The game will only change and effect files that it creates. If it does any more than this please let me know! It’s not intended! I recommend choosing an empty folder just to be safe!
            </Body1>
        </ProjectWrapper>
    );
};
