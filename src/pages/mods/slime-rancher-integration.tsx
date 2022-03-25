import { Body1 } from '@theturkeydev/gobble-lib-react';
import { ProjectWrapper } from '../../components/project-wrapper';

export const SlimeRancherIntegration = () => {
    return (
        <ProjectWrapper
            title='Slime Rancher Twitch Twitch Integration'
            subTittle='Slime Rancher Mod'
            links={[
                { href: 'https://github.com/TheTurkeyDev/Slime-Rancher-Twitch-Integration', text: 'Source Code' }
            ]}
            videos={[]}
        >
            <Body1>
                This mod is made in conjunction with a few twitch
                interfacing applications and allows streamers to add in game
                based events that get triggered from Twitch events.
            </Body1>
            <Body1>Supported Game Events:</Body1>
            <ul className='list-group'>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Spawning objects
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Downgrading plots
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Inventory bomb
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Player stats edit
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Move/ Pushing the player
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Adjusting player's money
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Shoot the players gun
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Day / Night toggle
                </li>
            </ul>
        </ProjectWrapper>
    );
};
