import { Headline4, Input, InputsWrapper, Modal, OutlinedButton, TextToast, useToast } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../contexts/auth-context';
import { postParams, useQuery } from '../../../hooks/use-query';
import { getDevAPIBase } from '../../../network/network-helper';
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
    const { pushToast } = useToast();
    const [title, setTitle] = useState('');

    const { query } = useQuery<void>(`${getDevAPIBase()}/steamkeys/list`, { requestData: postParams });

    const addList = () => {
        const list: SteamKeyList = { id: randomUID(), creator: userID, title, serverRoles: [], keys: [] };
        query(JSON.stringify(list)).then(() => {
            addNewList(list);
        }).catch(e => {
            pushToast(<TextToast text={`Failed to create new list! ${e.message}`} />);
        });
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <Wrapper>
                <Headline4>New Steam Key List</Headline4>
                <InputsWrapper>
                    <Input label='Title' value={title} onChange={e => setTitle(e.target.value)} />
                </InputsWrapper>
                <OutlinedButton onClick={addList}>Add</OutlinedButton>
            </Wrapper>
        </Modal>
    );
};