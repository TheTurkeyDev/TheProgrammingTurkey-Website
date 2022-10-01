import { ButtonRow, ContainedButton, Headline3 } from 'gobble-lib-react';
import styled from 'styled-components';
import { useFetch } from '../../../hooks/use-fetch';
import { postParams, useQuery } from '../../../hooks/use-query';
import { getDevAPIBase } from '../../../network/network-helper';
import { randomUID } from '../../../util/id';
import { DiscordGuild } from './discord-guild';
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
    const { data } = useFetch<readonly DiscordGuild[]>('/discord/guilds');
    const { data: groupsData, setData: setGroups } = useFetch<readonly DiscordRolesGroup[]>('/discord/groups');
    const { query } = useQuery<DiscordRolesGroup>(`${getDevAPIBase()}/discord/savegroup`, {
        requestData: postParams,
    });

    const groups = groupsData ?? [];

    const createNewGroup = () => {
        setGroups(old => [...(old ?? []), {
            id: randomUID(),
            server_id: '',
            server_name: 'TODO',
            channel_id: '',
            channel_name: 'TODO',
            name: 'TODO',
            description: 'TODO description',
            message_id: '',
            roles: []
        }]);
    };

    const updateGroup = (g: DiscordRolesGroup) => {
        console.log('Update', g);
        query(JSON.stringify(g)).then(updated => {
            if (updated) {
                const i = groups.findIndex(gr => gr.id === updated.id);
                setGroups(old => [...(old ?? []).slice(0, i), updated, ...(old ?? []).slice(i + 1)]);
            }
        });
    };

    return (
        <Wrapper>
            <Headline3>Discord Roles Management</Headline3>
            <ButtonRow>
                <ContainedButton onClick={() => createNewGroup()}>New Group</ContainedButton>
            </ButtonRow>
            {
                groups.map(g => <DiscordRolesOptions key={g.id} group={g} updateGroup={updateGroup} guilds={data ?? []} />)
            }
        </Wrapper>
    );
};