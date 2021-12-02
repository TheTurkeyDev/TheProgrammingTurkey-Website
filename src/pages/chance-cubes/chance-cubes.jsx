import { ProjectWrapper } from '../../components/project-wrapper';
import { ExtLink } from '../../styles/common-styles';

export const ChanceCubesMC = () => {
    return (
        <ProjectWrapper
            title='Chance Cubes'
            subtittle='Minecraft Mod'
            links={[
                { href: 'https://www.curseforge.com/minecraft/mc-mods/chance-cubes', text: ' Info Page and Download' },
                { href: 'https://github.com/TheTurkeyDev/ChanceCubes', text: 'Source Code' },
                { to: '/chancecubes/stats', text: 'Stats' }
            ]}
            videos={[]}
        >
            <p>
                Chance Cubes is a mod that I started as my first major
                modding project after moving over from Bukkit plugins.
                Chance Cubes is a RNG based mod that has both good and bad
                rewards that occur when you break a Chance Cubes block. The
                Idea for the mod started in as a replacement for the mod
                Lucky Blocks after it's terms of use prevented it from being
                used in public mod packs. While the original premise of the
                mod remains, I have slowly been adding my own twists and
                ideas to the mod as it develops.
            </p>
            <div className='mt-5' style={{ textDecoration: 'underline' }}>
                <h3>Rewards, Clips, and Gameplay Videos</h3>
            </div>
            <div className='mt-2'>
                <ExtLink className='ml-1' href='https://www.youtube.com/watch?v=zxzvBvMB0qQ'>
                    Village Construction Reward
                </ExtLink>
            </div>
            <div className='mt-2'>
                <ExtLink className='ml-1' href='https://www.youtube.com/watch?v=CMjavS2m2Tw'>
                    Math Reward
                </ExtLink>
            </div>
            <div className='mt-2'>
                <ExtLink className='ml-1' href='https://www.youtube.com/watch?v=VdiEjBlgbTs'>
                    Giant Chance Cube and Bio Dome
                </ExtLink>
            </div>
            <div className='mt-2'>
                <ExtLink className='ml-1' href='https://clips.twitch.tv/BenevolentGoldenClipsmomChocolateRain'>
                    Sketch - Leonidas Reward
                </ExtLink>
            </div>
            <div className='mt-2'>
                <ExtLink className='ml-1' href='https://clips.twitch.tv/PopularBoredEelFunRun'>
                    Tic-Tac-Toe Reward
                </ExtLink>
            </div>
        </ProjectWrapper>
    );
}
