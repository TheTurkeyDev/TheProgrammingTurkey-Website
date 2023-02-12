import { Body1, Icon } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '../../../hooks/use-query';
import { getDevAPIBase } from '../../../network/network-helper';
import { DiscordRoleEditModal } from './discord-role-edit-modal';
import { DiscordRoleOption } from './discord-role-option';
import { DiscordRolesGroup } from './discord-roles-group';

const RoleWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 8px;
    border: 1px solid green;
    padding: 8px;
`;

type DiscordRoleItemProps = {
    readonly roleOption: DiscordRoleOption
    readonly group: DiscordRolesGroup
    readonly save: (roleOption: DiscordRoleOption) => void
}

export const DiscordRoleItem = ({ roleOption, group, save }: DiscordRoleItemProps) => {
    const [showEdit, setShowEdit] = useState(roleOption.label === '');

    const [query] = useQuery<void>(`${getDevAPIBase()}/discord/roleoptionroles`, {
        requestData: {
            method: 'DELETE',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        },
    });

    const deleteItem = () => {
        query('', group.id);
    };

    return (
        <RoleWrapper>
            <Body1>{roleOption.label}</Body1>
            <Icon className='fas fa-edit' onClick={() => setShowEdit(true)} />
            <Icon className='fas fa-trash-alt' onClick={() => deleteItem()} />
            {showEdit && <DiscordRoleEditModal show={showEdit} requestClose={() => setShowEdit(false)} save={roleOpt => { save(roleOpt); setShowEdit(false); }} group={group} roleOption={roleOption} />}
        </RoleWrapper>
    );
};