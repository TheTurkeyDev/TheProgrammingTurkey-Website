import { Body1 } from 'gobble-lib-react';
import styled from 'styled-components';
import { ProjectWrapper } from '../../components/project-wrapper';

const ListItem = styled.li`
    list-style-type: none;
`;

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
            <Body1>
                This mod is made in conjunction with a few twitch
                interfacing applications and allows streamers to add in game
                based events that get triggered from Twitch events.
            </Body1>
            <Body1>Supported Game Events:</Body1>
            <ul>
                <ListItem>
                    Sounds
                </ListItem>
                <ListItem>
                    Chat message
                </ListItem>
                <ListItem>
                    Give items
                </ListItem>
                <ListItem>
                    Inventory bomb
                </ListItem>
                <ListItem>
                    Game stats/ settings edit
                </ListItem>
                <ListItem>
                    Move/ Pushing the player
                </ListItem>
                <ListItem>
                    Spawn an entity
                </ListItem>
                <ListItem>
                    Change the weather
                </ListItem>
                <ListItem>
                    Change the time of day
                </ListItem>
                <ListItem>
                    Pickup trash
                </ListItem>
                <ListItem>
                    Execute a command
                </ListItem>
                <ListItem>
                    Spawn a meteor shower
                </ListItem>
            </ul>
        </ProjectWrapper>
    );
};
