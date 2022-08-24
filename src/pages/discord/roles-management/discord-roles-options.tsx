import { BaseTheme, ButtonRow, ContainedButton, Headline5, Input, InputsWrapper, Option, OutlinedButton, Select, Subtitle1, TextArea, TextButton } from 'gobble-lib-react';
import { useEffect, useState } from 'react';
import styled, { ThemeProps } from 'styled-components';
import { CollapseChevron } from '../../../components/collapse-chevron';
import { getParams, postParams, useQuery } from '../../../hooks/use-query';
import { getDevAPIBase } from '../../../network/network-helper';
import { randomUID } from '../../../util/id';
import { DiscordGuild } from './discord-guild';
import { DiscordRoleItem } from './discord-role-item';
import { DiscordRoleOption } from './discord-role-option';
import { DiscordRolesGroup } from './discord-roles-group';

const RolesWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
`;

const RolesHeader = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    gap: 8px;
    background-color: ${({ theme }: ThemeProps<BaseTheme>) => theme.surface.color};
    border: 3px solid ${({ theme }: ThemeProps<BaseTheme>) => theme.surface.color};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 8px;
    align-items: center;
`;

const RolesGroupContent = styled.div`
    border: 3px solid ${({ theme }: ThemeProps<BaseTheme>) => theme.surface.color};
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px;
    align-items: center;
    padding: 8px;
`;

const RolesContent = styled.div`
    grid-column: 1 / span 2;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    padding: 8px;
`;

const RolesHeadline = styled(Headline5)`
    grid-column: 1 / span 2;
    text-align: center;
`;

type DiscordRolesOptionsProps = {
    readonly group: DiscordRolesGroup
    readonly guilds: readonly DiscordGuild[]
    readonly updateGroup: (group: DiscordRolesGroup) => void
}
export const DiscordRolesOptions = ({ group, guilds, updateGroup }: DiscordRolesOptionsProps) => {
    const [collapsed, setCollapsed] = useState(true);
    const [changes, setChanges] = useState(false);
    const [editedGroup, setEditedGroup] = useState(group);

    const { query: saveRoleOptions } = useQuery<void>(`${getDevAPIBase()}/discord/roleoption`, {
        requestData: postParams,
    });

    const { query: setRoleOptionRoles } = useQuery<void>(`${getDevAPIBase()}/discord/roleoptionroles`, {
        requestData: postParams,
    });

    useEffect(() => {
        setEditedGroup(group);
    }, [group]);

    const update = (g: DiscordRolesGroup) => {
        setChanges(true);
        setEditedGroup(g);
    };

    const setGuild = (id: string) => {
        const guildName = guilds.find(g => g.id === id);
        update({ ...editedGroup, server_id: id, server_name: guildName?.name ?? 'Error' });
    };

    const setChannel = (id: string) => {
        const channelName = guilds.find(g => g.id === editedGroup.server_id)?.channels.find(c => c.id === id);
        update({ ...editedGroup, channel_id: id, channel_name: channelName?.name ?? 'Error' });
    };

    const setRoles = (roles: readonly DiscordRoleOption[]) => {
        update({ ...editedGroup, roles });
    };

    const saveRoleItem = (roleOpt: DiscordRoleOption, i: number) => {
        setRoles([...editedGroup.roles.slice(0, i), roleOpt, ...editedGroup.roles.slice(i + 1)]);
        saveRoleOptions(JSON.stringify(roleOpt));
        setRoleOptionRoles(JSON.stringify(roleOpt.roles), roleOpt.id);
    };

    return (
        <RolesWrapper>
            <RolesHeader>
                <Subtitle1>{group.server_name}</Subtitle1>
                <Subtitle1>{group.channel_name}</Subtitle1>
                <Subtitle1>{group.name}</Subtitle1>
                <CollapseChevron collapsed={collapsed} setCollapsed={setCollapsed} />
            </RolesHeader>
            {
                !collapsed &&
                <RolesGroupContent>
                    <Input label='Name' value={editedGroup.name} onChange={(e) => update({ ...editedGroup, name: e.target.value })} />
                    <TextArea label='Description' value={editedGroup.description} onChange={(e) => update({ ...editedGroup, description: e.target.value })} />
                    <Select label='Guild' value={editedGroup.server_id} onChange={(e) => setGuild(e.target.value)}>
                        <Option value=''>Select Guild</Option>
                        {
                            guilds.map(g => <Option key={g.id} value={g.id}>{g.name}</Option>)
                        }
                    </Select>
                    <Select label='Channel' value={editedGroup.channel_id} disabled={editedGroup.server_id === ''} onChange={(e) => setChannel(e.target.value)}>
                        <Option value=''>Select Channel</Option>
                        {
                            guilds.find(g => g.id === editedGroup.server_id)?.channels.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)
                        }
                    </Select>
                    <RolesHeadline>Roles</RolesHeadline>
                    <RolesContent>
                        {
                            editedGroup.roles.map((r, i) => <DiscordRoleItem key={i} roleOption={r} group={group} save={roleOpt => saveRoleItem(roleOpt, i)} />)
                        }
                    </RolesContent>

                    <div></div>
                    <ButtonRow>
                        <OutlinedButton disabled={editedGroup.roles.length >= 24} onClick={() => setRoles([...editedGroup.roles, { role_group_id: editedGroup.id, id: randomUID(), label: '', description: '', roles: [], default: false }])}>Add Role</OutlinedButton>
                        <ContainedButton disabled={!changes} onClick={() => { updateGroup(editedGroup); setChanges(false); }}>Save</ContainedButton>
                    </ButtonRow>
                </RolesGroupContent>
            }
        </RolesWrapper >
    );
};