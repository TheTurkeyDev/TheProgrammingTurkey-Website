import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../components/inputs/input';
import { useOverlay } from '../../contexts/overlay-context';
import { useToast } from '../../contexts/toast-context';
import * as authAPI from '../../network/auth-network';
import { TextToast } from '../../toasts/text-toast';

const ContentWrapper = styled.div`
    width: 700px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-left: auto;
    margin-right: auto;
`;
export const ConnectMinecraftAccountOverlay = () => {
    const { popCurrentOverlay } = useOverlay();
    const { pushToast } = useToast();

    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState('');

    useEffect(() => {
        authAPI.connectAccount('minecraft').then(json => {
            if (json.success) {
                setToken(json.data);
            } else {
                pushToast(<TextToast text={json.message} />);
                popCurrentOverlay();
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className='spinner' />;
    }

    return (
        <ContentWrapper>
            <Input name='token' label='Token' value={token} disabled={true} />
            <h3>Instructions</h3>
            <p>TODO</p>
        </ContentWrapper>
    );
};
