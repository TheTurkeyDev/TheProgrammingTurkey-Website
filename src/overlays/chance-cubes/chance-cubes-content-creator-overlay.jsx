import { useState } from 'react';
import styled from 'styled-components';
import { useOverlay } from '../../contexts/overlay-context';
import { useToast } from '../../contexts/toast-context';
import { userListUpdateUser, userListAddUser } from '../../network/chance-cubes-network';
import { TextToast } from '../../toasts/text-toast';

const FormWrapper = styled.div`
    display: grid;
    grid-template-rows: auto auto auto auto auto;
    gap: 16px;
`;

const InputWrapper = styled.div`
    display: grid;
    grid-template-rows: auto auto;
    justify-items: left;
`

export const ChanceCubesContentCreatorOverlay = ({ user }) => {
    const { popCurrentOverlay } = useOverlay();
    const { pushToast } = useToast();

    const isNewUser = !user;

    const [uuid, setUUID] = useState(user?.UUID ?? '');
    const [userName, setUserName] = useState(user?.Name ?? '');
    const [type, setType] = useState(user?.Type ?? '');
    const [twitch, setTwtich] = useState(user?.Twitch ?? '');

    const submitInfo = () => {
        if (isNewUser) {
            const resp = userListAddUser(uuid, userName, type, twitch);
            pushToast(<TextToast text={resp.message} />);
        }
        else {
            const resp = userListUpdateUser(uuid, userName, type, twitch);
            pushToast(<TextToast text={resp.message} />);
        }
        popCurrentOverlay();
    }

    return (
        <FormWrapper>
            <InputWrapper>
                <label>UUID</label>
                <input type='text' disabled={!isNewUser} value={uuid} onChange={e => setUUID(e.target.value)} />
            </InputWrapper>
            <InputWrapper>
                <label>UserName</label>
                <input type='text' value={userName} onChange={e => setUserName(e.target.value)} />
            </InputWrapper>
            <InputWrapper>
                <label>Type</label>
                <input type='text' value={type} onChange={e => setType(e.target.value)} />
            </InputWrapper>
            <InputWrapper>
                <label>Twitch</label>
                <input type='text' value={twitch} onChange={e => setTwtich(e.target.value)} />
            </InputWrapper>
            <button onClick={() => submitInfo()}>Save</button>
        </FormWrapper>
    );
}