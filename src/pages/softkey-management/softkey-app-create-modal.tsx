import { ButtonRow, ContainedButton, Headline4, Input, InputsWrapper, Modal, OutlinedButton, useQuery } from 'gobble-lib-react';
import { useState } from 'react';
import { VStack } from '../../components/stack';
import { getDevAPIBase } from '../../network/network-helper';
import { postParams } from '../../network/auth-network';
import { useNavigate } from 'react-router-dom';
import { SoftkeyApp } from './softkey-app';

type SoftkeyAppCreateModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
}

export const SoftkeyAppCreateModal = ({ show, requestClose }: SoftkeyAppCreateModalProps) => {

    const navigate = useNavigate();

    const [createApp, creating] = useQuery<SoftkeyApp>(`${getDevAPIBase()}/softkey`, { requestData: postParams, shouldThrow: true });

    const [name, setName] = useState('');

    const onCreateClick = () => {
        if (!name)
            return;
        createApp(JSON.stringify({ name })).then(app => app && navigate(app.uuid));
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <VStack>
                <Headline4>Create New Softkey App</Headline4>
                <InputsWrapper>
                    <Input label='Name' value={name} onChange={e => setName(e.target.value)} maxLength={90} />
                </InputsWrapper>
                <ButtonRow>
                    <OutlinedButton onClick={requestClose}>Cancel</OutlinedButton>
                    <ContainedButton onClick={onCreateClick} loading={creating} disabled={!name}>Create</ContainedButton>
                </ButtonRow>
            </VStack>
        </Modal>
    );
};