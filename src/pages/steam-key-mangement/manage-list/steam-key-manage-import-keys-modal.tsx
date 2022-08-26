import { Body1, Headline4, InputsWrapper, Modal, OutlinedButton, TextArea } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr;
    justify-items: center;
`;

type SteamKeyManageImportKeysModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly importKeys: (keys: string) => void
}

export const SteamKeyManageImportKeysModal = ({ show, requestClose, importKeys }: SteamKeyManageImportKeysModalProps) => {
    const [keys, setKeys] = useState('');
    const [error, setError] = useState('');

    const attemptImport = () => {
        const invalid = keys.split('\n').filter(k => !k.trim().match(/^[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}$/));

        console.log(keys);
        console.log(invalid);

        if (invalid.length > 0)
            setError(`'${invalid[0]}' is not a valid key!`);
        else
            importKeys(keys);
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <Wrapper>
                <Headline4>Import Steam Keys</Headline4>
                <InputsWrapper>
                    <TextArea label='Keys' value={keys} onChange={e => setKeys(e.target.value)} style={{ minHeight: '400px' }} />
                </InputsWrapper>
                <Body1>{error}</Body1>
                <OutlinedButton onClick={() => attemptImport()}>Import</OutlinedButton>
            </Wrapper>
        </Modal>
    );
};


//EXPKP-2HEEE-DIHX2
//EBJBY-4K4PM-LQMVV
//AZKB6-52F10-D920P
//D4I3L-3Y3JR-AKGIR
//6GBPD-GYQFQ-LC63F
//JNPYW-KYHPW-VYN2B
//X8V8K-2R487-WBX2B
//GMDHN-KYYD5-R2YOM
 