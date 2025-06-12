import { Body1 } from 'gobble-lib-react';
import { ProjectWrapper } from '../../components/project-wrapper';

export const GMTK2022 = () => {
    return (
        <ProjectWrapper
            title='Chance And Skill'
            subTittle='For GMTK 2022!'
            links={[
                { href: 'https://turkeydev.itch.io/gmtk-2022', text: 'Play The Game' },
                { href: 'https://itch.io/jam/gmtk-jam-2022/rate/1620772#post-6236896', text: 'GMTK Page' },
                { href: 'https://github.com/TheTurkeyDev/gmtk2022', text: 'Source Code' }
            ]}
            videos={[
                { title: 'Devlog', url: '' },
            ]}
        >
            <Body1>
                The goal of this game is to advance as far up the grid as possible!
            </Body1>
            <Body1>
                Wasn't originally planning to make a game for this GMTK, but a long flight gave me the chance to do it.
            </Body1>
            <Body1>
                This game was made in 24 hours and is written all in JavaScript! The final zip of the game is a mear 63KB!
            </Body1>
        </ProjectWrapper>
    );
};
