import { Body1 } from 'gobble-lib-react';
import styled from 'styled-components';
import { ProjectWrapper } from '../../components/project-wrapper';

const ListItem = styled.li`
    list-style-type: none;
`;

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
            <ul>
                <ListItem>
                    Spawning objects
                </ListItem>
                <ListItem>
                    Downgrading plots
                </ListItem>
                <ListItem>
                    Inventory bomb
                </ListItem>
                <ListItem>
                    Player stats edit
                </ListItem>
                <ListItem>
                    Move/ Pushing the player
                </ListItem>
                <ListItem>
                    Adjusting player's money
                </ListItem>
                <ListItem>
                    Shoot the players gun
                </ListItem>
                <ListItem>
                    Day / Night toggle
                </ListItem>
            </ul>
        </ProjectWrapper>
    );
};
