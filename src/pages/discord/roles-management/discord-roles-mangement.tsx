import { ButtonRow, ContainedButton, Headline3 } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { DiscordRolesGroup } from './discord-roles-group';
import { DiscordRolesOptions } from './discord-roles-options';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 8px;
    max-width: 900px;
    margin-inline: auto;
`;

export const DiscordRolesManagement = () => {
    const [groups, setGroups] = useState<readonly DiscordRolesGroup[]>([]);

    const createNewGroup = () => {
        setGroups(old => [...old, { server: 'TODO', channel: 'TODO', name: 'TODO', description: 'TODO description' }]);
    };
    return (
        <Wrapper>
            <Headline3>Discord Roles Management</Headline3>
            <ButtonRow>
                <ContainedButton onClick={() => createNewGroup()}>New Group</ContainedButton>
            </ButtonRow>
            {
                groups.map(g => <DiscordRolesOptions group={g} />)
            }
        </Wrapper>
    );
};