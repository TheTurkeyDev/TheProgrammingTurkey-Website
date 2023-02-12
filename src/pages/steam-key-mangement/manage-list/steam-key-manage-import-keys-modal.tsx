import { Body1, Headline4, InputsWrapper, Modal, OutlinedButton, TextArea } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { postParams, useQuery } from '../../../hooks/use-query';
import { getDevAPIBase } from '../../../network/network-helper';
import { SteamKey } from '../steam-key';

const Wrapper = styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr;
    justify-items: center;
`;

type SteamKeyManageImportKeysModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly id: string
    readonly addKeys: (keys: readonly SteamKey[]) => void
}

export const SteamKeyManageImportKeysModal = ({ show, requestClose, id, addKeys }: SteamKeyManageImportKeysModalProps) => {
    const [keys, setKeys] = useState('');
    const [error, setError] = useState('');

    const [query, querying] = useQuery<readonly SteamKey[]>(`${getDevAPIBase()}/steamkeys/list/${id}/addkeys`, {
        requestData: postParams
    });


    const attemptImport = () => {
        const invalid = keys.split('\n').filter(k => !k.trim().match(/^[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}$/));

        if (invalid.length > 0) {
            setError(`'${invalid[0]}' is not a valid key!`);
        }
        else {
            const keysArr = keys.split('\n');
            query(JSON.stringify(keysArr)).then(keys => {
                addKeys(keys ?? []);
                requestClose();
            }).catch(e => setError(JSON.stringify(e)));
        }
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <Wrapper>
                <Headline4>Import Steam Keys</Headline4>
                <InputsWrapper>
                    <TextArea label='Keys' value={keys} onChange={e => setKeys(e.target.value)} style={{ minHeight: '400px' }} />
                </InputsWrapper>
                <Body1>{error}</Body1>
                <OutlinedButton onClick={() => attemptImport()} loading={querying} disabled={querying}>Import</OutlinedButton>
            </Wrapper>
        </Modal>
    );
};