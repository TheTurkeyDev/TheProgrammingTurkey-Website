import { Headline4, Input, InputsWrapper, Modal, OutlinedButton, useQuery } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { postParams } from '../../../network/auth-network';
import { getDevAPIBase } from '../../../network/network-helper';
import { SteamKeyServerRole } from '../steam-key-server-role';

const Wrapper = styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr;
    justify-items: center;
`;

type SteamKeyManagementAddSeverRoleModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly listId: string
    readonly addNewServerRole: (role: SteamKeyServerRole) => void
}
export const SteamKeyManagementAddSeverRoleModal = ({ show, requestClose, listId, addNewServerRole }: SteamKeyManagementAddSeverRoleModalProps) => {
    const [serverId, setServerId] = useState('');
    const [roleId, setRoleId] = useState('');

    const [query, querying] = useQuery<SteamKeyServerRole>(`${getDevAPIBase()}/steamkeys/list/${listId}/serverrole`, { requestData: postParams });

    const addServerRole = () => {
        const serverRole = { listId: listId, discordServer: serverId, discordRole: roleId };
        query(JSON.stringify(serverRole)).then(data => {
            if (data)
                addNewServerRole(data);
        });
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <Wrapper>
                <Headline4>New Steam Key Server Role</Headline4>
                <InputsWrapper>
                    <Input label='Discord Server Id' type='number' placeholder='Blank or 0 to ignore' value={serverId} onChange={e => setServerId(e.target.value)} />
                    <Input label='Discord Role Id' type='number' placeholder='Blank or 0 to ignore' value={roleId} onChange={e => setRoleId(e.target.value)} />
                </InputsWrapper>
                <OutlinedButton loading={querying} onClick={addServerRole}>Add</OutlinedButton>
            </Wrapper>
        </Modal>
    );
};