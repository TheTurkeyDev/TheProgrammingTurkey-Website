import { ButtonRow, ContainedButton, Headline4, Input, InputsWrapper, Modal, OutlinedButton, ToggleSwitch, useQuery } from 'gobble-lib-react';
import { useState } from 'react';
import { VStack } from '../../components/stack';
import { getDevAPIBase } from '../../network/network-helper';
import { patchParams } from '../../network/auth-network';
import { SoftkeyApp } from './softkey-app';
import { SoftkeyKey } from './softkey-key';

type SoftkeyKeyEditModalProps = {
    readonly appId: string
    readonly softKey: SoftkeyKey
    readonly show: boolean
    readonly requestClose: () => void
    readonly onSave: () => void
}

export const SoftkeyKeyEditModal = ({ appId, softKey, show, requestClose, onSave }: SoftkeyKeyEditModalProps) => {
    const [saveKey, saving] = useQuery<SoftkeyApp>(`${getDevAPIBase()}/softkey/${appId}/keys`, { requestData: patchParams, shouldThrow: true });

    const [active, setActive] = useState(softKey.active);
    const [owner, setOwner] = useState(softKey.owner);

    const onSaveClick = () => {
        saveKey(JSON.stringify({ active, owner }), softKey.uuid).then(onSave);
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <VStack>
                <Headline4>Edit Key</Headline4>
                <InputsWrapper>
                    <Input label='Key' value={softKey.uuid} disabled />
                    <Input label='Owner' value={owner} onChange={e => setOwner(e.target.value)} />
                    <ToggleSwitch label='Active' checked={active} onClick={() => setActive(old => !old)} />
                </InputsWrapper>
                <ButtonRow>
                    <OutlinedButton onClick={requestClose}>Cancel</OutlinedButton>
                    <ContainedButton onClick={onSaveClick} loading={saving}>Save</ContainedButton>
                </ButtonRow>
            </VStack>
        </Modal>
    );
};