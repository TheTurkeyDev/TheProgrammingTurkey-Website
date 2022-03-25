import { Body1 } from '@theturkeydev/gobble-lib-react';
import { ProjectWrapper } from '../../components/project-wrapper';

export const LD37 = () => {
    return (
        <ProjectWrapper
            title='Hedge Maze Overlord'
            subTittle='For LudumDare 37!'
            links={[
                { href: 'https://www.dropbox.com/s/5f02bok8gu5e6ow/HedgeMazeOverlord48Version.jar?dl=0', text: 'Download' },
                { href: 'http://ludumdare.com/compo/ludum-dare-37/?action=preview&uid=24562', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare37', text: 'Source Code' }
            ]}
            videos={[
                { title: 'TimeLapse', url: 'T-ytFpeOGYk' },
            ]}
        >
            <Body1>
                This game was made for ludum dare 37! After not
                participation in the previous Ludum Dare, I decided to
                atleast make a game for this while while in between college
                finals studying sessions. Making this game mainly helped me
                take a break from all that was going on and somewhat take a
                small relaxing break..... sort of. At any rate I ended up
                making this Hedge Maze Overlord, using the LibGDX frame work
                yet again and due to my limited amount of time much of the
                game was put together using code and stuff that I have
                previously made and now include in my hodge podge libGDX api
                of sorts. None the less, the game was made and is now
                available to play!
            </Body1>
        </ProjectWrapper>
    );
};
