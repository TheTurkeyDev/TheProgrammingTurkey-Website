import { Body1, Headline5 } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';
import { ProjectWrapper } from '../../components/project-wrapper';
import { ExtLink } from '../../styles/common-styles';

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
`;

export const ChanceCubesMC = () => {
    return (
        <ProjectWrapper
            title='Chance Cubes'
            subTittle='Minecraft Mod'
            links={[
                { href: 'https://www.curseforge.com/minecraft/mc-mods/chance-cubes', text: ' Info Page and Download' },
                { href: 'https://github.com/TheTurkeyDev/ChanceCubes', text: 'Source Code' },
                { to: '/chancecubes/stats', text: 'Stats' }
            ]}
            videos={[]}
        >
            <ContentWrapper>
                <Body1>
                    Chance Cubes is a mod that I started as my first major
                    modding project after moving over from Bukkit plugins.
                    Chance Cubes is a RNG based mod that has both good and bad
                    rewards that occur when you break a Chance Cubes block. The
                    Idea for the mod started in as a replacement for the mod
                    Lucky Blocks after it's terms of use prevented it from being
                    used in public mod packs. While the original premise of the
                    mod remains, I have slowly been adding my own twists and
                    ideas to the mod as it develops.
                </Body1>
                <Headline5><u>Rewards, Clips, and Gameplay Videos</u></Headline5>
                <ExtLink className='ml-1' href='https://www.youtube.com/watch?v=zxzvBvMB0qQ'>
                    Village Construction Reward
                </ExtLink>
                <ExtLink className='ml-1' href='https://www.youtube.com/watch?v=CMjavS2m2Tw'>
                    Math Reward
                </ExtLink>
                <ExtLink className='ml-1' href='https://www.youtube.com/watch?v=VdiEjBlgbTs'>
                    Giant Chance Cube and Bio Dome
                </ExtLink>
                <ExtLink className='ml-1' href='https://clips.twitch.tv/BenevolentGoldenClipsmomChocolateRain'>
                    Sketch - Leonidas Reward
                </ExtLink>
                <ExtLink className='ml-1' href='https://clips.twitch.tv/PopularBoredEelFunRun'>
                    Tic-Tac-Toe Reward
                </ExtLink>
            </ContentWrapper>
        </ProjectWrapper>
    );
};
