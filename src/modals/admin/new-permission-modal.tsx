import { ButtonRow, ContainedButton, Headline4, Input, Modal, OutlinedButton, TextToast, useToast } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import * as authAPI from '../../network/auth-network';

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    max-width: 400px;
    margin-right: auto;
    margin-left: auto;
`;

type NewPermissionModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly update: () => void
}
export const NewPermissionModal = ({ show, requestClose, update }: NewPermissionModalProps) => {
    const { pushToast } = useToast();

    const [permissionID, setPermissionID] = useState('');
    const [description, setDescription] = useState('');

    const createPerm = () => {
        if (!permissionID) {
            pushToast(<TextToast text='Permission ID not set!' />);
            return;
        }

        if (!description) {
            pushToast(<TextToast text='Description not set!' />);
            return;
        }

        authAPI.createPermission(permissionID, description).then(json => {
            if (json.message)
                pushToast(<TextToast text={json.message} />);
            requestClose();
            update();
        });
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <ContentWrapper>
                <Headline4>Add New Permission</Headline4>
                <Input type='text' name='id' label='Permission Id' value={permissionID} onChange={e => setPermissionID(e.target.value)} />
                <Input type='text' name='description' label='Description' value={description} onChange={e => setDescription(e.target.value)} />
                <ButtonRow>
                    <OutlinedButton onClick={requestClose}>Cancel</OutlinedButton>
                    <ContainedButton onClick={createPerm}>Create</ContainedButton>
                </ButtonRow>
            </ContentWrapper >
        </Modal>
    );
};
