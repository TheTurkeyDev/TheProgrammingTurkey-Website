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

type SteamKeyManagementAddListModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly addNewList: (list: SteamKeyList) => void
}
export const SteamKeyManagementAddListModal = ({ show, requestClose, addNewList }: SteamKeyManagementAddListModalProps) => {
    const { userID } = useAuth();
    const [title, setTitle] = useState('');

    return (
        <Modal show={show} requestClose={requestClose}>
            <Wrapper>
                <Headline4>New Steam Key List</Headline4>
                <InputsWrapper>
                    <Input label='Title' value={title} onChange={e => setTitle(e.target.value)} />
                </InputsWrapper>
                <OutlinedButton onClick={() => addNewList({ id: randomUID(), creator: userID, title, serverRoles: [], keys: [] })}>Add</OutlinedButton>
            </Wrapper>
        </Modal>
    );
};