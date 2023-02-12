import { Headline4, Input, InputsWrapper, Modal, OutlinedButton } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../contexts/auth-context';
import { postParams, useQuery } from '../../../hooks/use-query';
import { getDevAPIBase } from '../../../network/network-helper';
import { randomUID } from '../../../util/id';
import { SteamKeyClaimGroup } from '../claim-key/steam-key-claim-group';
import { SteamKeyList } from '../steam-key-list';
import { SteamKeyServerRole } from '../steam-key-server-role';

const Wrapper = styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr;
    justify-items: center;
`;

type SteamKeyManagementAddClaimGroupModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly listId: string
    readonly addNewClaimGroup: (group: SteamKeyClaimGroup) => void
}
export const SteamKeyManagementAddClaimGroupModal = ({ show, requestClose, listId, addNewClaimGroup }: SteamKeyManagementAddClaimGroupModalProps) => {
    const [name, setName] = useState('');

    const [ query, querying ] = useQuery<SteamKeyClaimGroup>(`${getDevAPIBase()}/steamkeys/list/${listId}/claimgroup`, { requestData: postParams });

    const addClaimGroup = () => {
        const claimGroup: SteamKeyClaimGroup = { id: randomUID(8), name, keyLists: [] };
        query(JSON.stringify(claimGroup)).then(data => {
            if (data)
                addNewClaimGroup(data);
        });
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <Wrapper>
                <Headline4>New Steam Key Claim Group</Headline4>
                <InputsWrapper>
                    <Input label='Name' value={name} onChange={e => setName(e.target.value)} />
                </InputsWrapper>
                <OutlinedButton loading={querying} onClick={addClaimGroup}>Add</OutlinedButton>
            </Wrapper>
        </Modal>
    );
};