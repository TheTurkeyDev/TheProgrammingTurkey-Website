import { Body1 } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
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
    return (
        <RoleWrapper>
            <Body1>{roleOption.label}</Body1>
            <i className='fas fa-edit clickable' onClick={() => setShowEdit(true)} />
            <i className='fas fa-trash-alt clickable' />
            {showEdit && <DiscordRoleEditModal show={showEdit} requestClose={() => setShowEdit(false)} save={roleOpt => { save(roleOpt); setShowEdit(false); }} group={group} roleOption={roleOption} />}
        </RoleWrapper>
    );
};