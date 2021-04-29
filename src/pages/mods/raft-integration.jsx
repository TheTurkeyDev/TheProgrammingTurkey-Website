import { ProjectWrapper } from '../../components/project-wrapper';

export const RaftIntegration = () => {
    return (
        <ProjectWrapper
            title='Raft Twitch Integration'
            subTittle='Raft Mod'
            links={[
                { href: 'https://github.com/TheTurkeyDev/Raft-Game-Twitch-Integration', text: 'Source Code' }
            ]}
            videos={[]}
        >
            <p>
                This mod is made in conjunction with a few twitch
                interfacing applications and allows streamers to add in game
                based events that get triggered from Twitch events.
            </p>
            <p>Supported Game Events:</p>
            <ul className='list-group'>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Sounds
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Chat message
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Give items
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Inventory bomb
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Game stats/ settings edit
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Move/ Pushing the player
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Spawn an entity
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Change the weather
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Change the time of day
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Pickup trash
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Execute a command
                </li>
                <li className='list-group-item bg-primary pt-0 pb-0'>
                    Spawn a meteor shower
                </li>
            </ul>
        </ProjectWrapper>
    );
}
