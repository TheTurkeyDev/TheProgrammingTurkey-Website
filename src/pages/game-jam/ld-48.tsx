import { Body1 } from 'gobble-lib-react';
import { ProjectWrapper } from '../../components/project-wrapper';

export const LD48 = () => {
    return (
        <ProjectWrapper
            title='Scriptless Pipes'
            subTittle='For LudumDare 48!'
            links={[
                { href: 'https://games.theturkey.dev/ld48', text: 'Play The Game' },
                { href: 'https://ldjam.com/events/ludum-dare/48/scriptless-pipes', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare48', text: 'Source Code' }
            ]}
            videos={[
                { title: 'Devlog', url: 'GAtzLFWUQjw' },
                { title: 'TimeLapse', url: 'OtgwO-7BzoE' },
            ]}
        >
            <Body1>
                Welcome to Scriptless Pipes!
            </Body1>
            <Body1>
                This game was made entirely using only HTML and CSS. Not a single drop of script is contained in this project or was used to make this!
            </Body1>
            <Body1>
                The goal of Scriptless Pipes is simply to get to the bottom of the webpage! You utilize the pipes to take you deeper and deep to the various layers of each level.
            </Body1>
            <Body1>
                Some levels have additional tasks like flipping levers, or finding/ solving a code before you may progress to the next level.
            </Body1>
            <Body1>
                This game works on mobile, (It’s HTML and CSS why wouldn’t it), but I do recommend you use landscape mode to prevent things from getting bunched up and over top of each other.
            </Body1>
        </ProjectWrapper>
    );
};
