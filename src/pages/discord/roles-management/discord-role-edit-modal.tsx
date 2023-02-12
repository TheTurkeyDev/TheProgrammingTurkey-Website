import { ButtonRow, ContainedButton, Headline3, Input, InputsWrapper, Modal, Option, OutlinedButton, Select, TextArea } from 'gobble-lib-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useFetch } from '../../../hooks/use-fetch';
import { DiscordRole } from './discord-role';
import { DiscordRoleOption } from './discord-role-option';
import { DiscordRolesGroup } from './discord-roles-group';

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
`;

type DiscordRoleEditModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly save: (roleOption: DiscordRoleOption) => void
    readonly roleOption: DiscordRoleOption
    readonly group: DiscordRolesGroup
}

export const DiscordRoleEditModal = ({ show, requestClose, save, roleOption, group }: DiscordRoleEditModalProps) => {

    const [roleOptionCache, setRoleOptionCache] = useState(roleOption);
    const [roles] = useFetch<readonly DiscordRole[]>(`/discord/roles?guildid=${group.server_id}`);

    const canClose = roleOptionCache.label !== '' && roleOptionCache.description !== '';

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRoleOptionCache(old => { return { ...old, roles: Array.from(e.target.selectedOptions, option => option.value) }; });
    };

    const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoleOptionCache(old => { return { ...old, label: e.target.value }; });
    };

    const updateDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRoleOptionCache(old => { return { ...old, description: e.target.value }; });
    };

    return (
        <Modal show={show} requestClose={() => { if (canClose) requestClose(); }}>
            <Content>
                <Headline3>Role Option Edit</Headline3>
                <InputsWrapper fullWidth={true}>
                    <Input label='Name' onChange={updateName} value={roleOptionCache.label} />
                    <TextArea label='Description' onChange={updateDescription} value={roleOptionCache.description} />
                    <Select label='Role' value={roleOptionCache.roles} onChange={handleSelectChange} style={{ height: '100px' }} multiple >
                        {
                            roles?.map(r => <Option key={r.id} value={r.id}>{r.name}</Option>)
                        }
                    </Select>
                </InputsWrapper>
                <ButtonRow>
                    <OutlinedButton onClick={() => requestClose()}>Cancel</OutlinedButton>
                    <ContainedButton disabled={!canClose} onClick={() => save(roleOptionCache)}>Save</ContainedButton>
                </ButtonRow>
            </Content>
        </Modal>
    );
};