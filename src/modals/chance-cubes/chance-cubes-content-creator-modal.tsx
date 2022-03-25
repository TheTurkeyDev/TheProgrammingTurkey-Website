import { ContainedButton, Input, InputsWrapper, Modal, TextToast, useToast } from '@theturkeydev/gobble-lib-react';
import { useState } from 'react';
import { userListUpdateUser, userListAddUser } from '../../network/chance-cubes-network';
import { CCContentCreator } from '../../types/chance-cubes/chance-cubes-content-creator';

type ChanceCubesContentCreatorOverlayProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly user?: CCContentCreator
}
export const ChanceCubesContentCreatorModal = ({ show, requestClose, user }: ChanceCubesContentCreatorOverlayProps) => {
    const { pushToast } = useToast();

    const isNewUser = !user;

    const [uuid, setUUID] = useState(user?.UUID ?? '');
    const [userName, setUserName] = useState(user?.Name ?? '');
    const [type, setType] = useState(user?.Type ?? '');
    const [twitch, setTwtich] = useState(user?.Twitch ?? '');

    const submitInfo = () => {
        if (isNewUser) {
            userListAddUser({ UUID: uuid, Name: userName, Type: type, Twitch: twitch }).then(resp => {
                pushToast(<TextToast text={resp.message} />);
            });
        }
        else {
            userListUpdateUser({ UUID: uuid, Name: userName, Type: type, Twitch: twitch }).then(resp => {
                pushToast(<TextToast text={resp.message} />);
            });
        }
        requestClose();
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <InputsWrapper>
                <Input name='uuid' label='UUID' value={uuid} onChange={e => setUUID(e.target.value)} disabled={!isNewUser} />
                <Input name='userName' label='UserName' value={userName} onChange={e => setUserName(e.target.value)} />
                <Input name='type' label='Type' value={type} onChange={e => setType(e.target.value)} />
                <Input name='twitch' label='Twitch' value={twitch} onChange={e => setTwtich(e.target.value)} />
                <ContainedButton onClick={() => submitInfo()}>Save</ContainedButton>
            </InputsWrapper>
        </Modal>
    );
};