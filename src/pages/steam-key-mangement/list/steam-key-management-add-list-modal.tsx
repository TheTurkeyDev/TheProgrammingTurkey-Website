import { Headline4, Input, InputsWrapper, Modal, OutlinedButton } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../contexts/auth-context';
import { randomUID } from '../../../util/id';
import { SteamKeyList } from '../steam-key-list';

const Wrapper = styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr;
    justify-items: center;
`;

type SteamKeyManagmentAddListModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly addNewList: (list: SteamKeyList) => void
}
export const SteamKeyManagmentAddListModal = ({ show, requestClose, addNewList }: SteamKeyManagmentAddListModalProps) => {
    const { userID } = useAuth();
    const [title, setTitle] = useState('');
    const [serverId, setServerId] = useState('');
    const [roleId, setRoleId] = useState('');

    return (
        <Modal show={show} requestClose={requestClose}>
            <Wrapper>
                <Headline4>New Steam Key List</Headline4>
                <InputsWrapper>
                    <Input label='Title' value={title} onChange={e => setTitle(e.target.value)} />
                    <Input label='Discord Server Id' type='number' placeholder='Blank or 0 to ignore' value={serverId} onChange={e => setServerId(e.target.value)} />
                    <Input label='Discord Role Id' type='number' placeholder='Blank or 0 to ignore' value={roleId} onChange={e => setRoleId(e.target.value)} />
                </InputsWrapper>
                <OutlinedButton onClick={() => addNewList({ id: randomUID(), creator: userID, title, discord_server: serverId, discord_role: roleId, keys: [] })}>Add</OutlinedButton>
            </Wrapper>
        </Modal>
    );
};