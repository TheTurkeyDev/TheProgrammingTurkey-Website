import { Body1 } from '@theturkeydev/gobble-lib-react';
import { ProjectWrapper } from '../../components/project-wrapper';

export const LD46 = () => {
    return (
        <ProjectWrapper
            title={'Turkey\'s Plant Emporium'}
            subTittle='For LudumDare 46!'
            links={[
                { href: 'http://files.theprogrammingturkey.com/index.html?path=ludm_dare/turkeys_plant_emporium_72_hr.jar', text: 'Download' },
                { href: 'https://ldjam.com/events/ludum-dare/46/turkeys-plant-emporium', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare46', text: 'Source Code' }
            ]}
            videos={[
                { title: 'TimeLapse', url: 'S_9nnH3hBDA' },
            ]}
        >
            <Body1>
                This game was made for ludum dare 46! It's been awhile....
                Like awhile awhile sine I've done a Ludum Dare, but I
                finally got around to doing another one! Life has been all
                over the place. COVID-19 currently has my state under a stay
                at home order and to top it off, I'm graduating college in
                less than 2 weeks from the time of completing this game.
                Sounds like a great time to make a Ludum Dare game! This
                time was special too as I completed this game in a team with
                SpaceMyName who made the art assets and sounds!
            </Body1>
        </ProjectWrapper>
    );
};
