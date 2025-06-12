import { Modal, OutlinedButton, TextArea } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { Directive } from './directive';

const Wrapper = styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr;
    justify-items: center;
`;

type ImportJsonModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly importJson: (directives: readonly Directive[]) => void
}
export const ImportJsonModal = ({ show, requestClose, importJson }: ImportJsonModalProps) => {
    const [json, setJson] = useState('');
    return (
        <Modal show={show} requestClose={requestClose}>
            <Wrapper>
                <TextArea label='JSON' value={json} onChange={e => setJson(e.target.value)} />
                <OutlinedButton onClick={() => importJson(JSON.parse(json) as readonly Directive[])}>Import</OutlinedButton>
            </Wrapper>
        </Modal>
    );
};