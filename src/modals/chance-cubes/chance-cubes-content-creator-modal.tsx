import { ButtonRow, ContainedButton, Input, InputsWrapper, Modal, OutlinedButton, TextToast, useQuery, useToast } from 'gobble-lib-react';
import { useState } from 'react';
import { CCContentCreator } from '../../types/chance-cubes/chance-cubes-content-creator';
import { getDevAPIBase } from '../../network/network-helper';
import { postParams } from '../../network/auth-network';
import { BasicMessageResponse } from '../../types/rest-response-wrapper';

type ChanceCubesContentCreatorOverlayProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly user?: CCContentCreator
}
export const ChanceCubesContentCreatorModal = ({ show, requestClose, user }: ChanceCubesContentCreatorOverlayProps) => {
    const { pushToast } = useToast();

    const [upsertUser] = useQuery<BasicMessageResponse>(`${getDevAPIBase()}/chancecubes/userlist`, { requestData: postParams });

    const isNewUser = !user;

    const [uuid, setUUID] = useState(user?.UUID ?? '');
    const [userName, setUserName] = useState(user?.Name ?? '');
    const [type, setType] = useState(user?.Type ?? '');
    const [twitch, setTwtich] = useState(user?.Twitch ?? '');

    const submitInfo = () => {
        upsertUser(JSON.stringify({ UUID: uuid, Name: userName, Type: type, Twitch: twitch }), isNewUser ? '' : uuid).then(resp => {
            pushToast(<TextToast text={resp?.message ?? 'ERR'} />);
            requestClose();
        });
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <InputsWrapper>
                <Input name='uuid' label='UUID' value={uuid} onChange={e => setUUID(e.target.value)} disabled={!isNewUser} />
                <Input name='userName' label='UserName' value={userName} onChange={e => setUserName(e.target.value)} />
                <Input name='type' label='Type' value={type} onChange={e => setType(e.target.value)} />
                <Input name='twitch' label='Twitch' value={twitch} onChange={e => setTwtich(e.target.value)} />
            </InputsWrapper>
            <ButtonRow>
                <OutlinedButton onClick={() => requestClose()}>Cancel</OutlinedButton>
                <ContainedButton onClick={() => submitInfo()}>Save</ContainedButton>
            </ButtonRow>
        </Modal>
    );
};