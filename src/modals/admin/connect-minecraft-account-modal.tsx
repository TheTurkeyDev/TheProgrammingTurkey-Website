import { Headline5, Input, Modal, TextToast, useToast } from 'gobble-lib-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as authAPI from '../../network/auth-network';

const ContentWrapper = styled.div`
    width: 700px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-left: auto;
    margin-right: auto;
`;

type ConnectMinecraftAccountModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
}
export const ConnectMinecraftAccountModal = ({ show, requestClose }: ConnectMinecraftAccountModalProps) => {
    const { pushToast } = useToast();

    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState('');

    useEffect(() => {
        authAPI.connectAccount('minecraft').then(json => {
            if (json.success) {
                setToken(json.data);
            } else {
                pushToast(<TextToast text={json.message} />);
                requestClose();
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className='spinner' />;
    }

    return (
        <Modal show={show} requestClose={requestClose}>
            <ContentWrapper>
                <Input name='token' label='Token' value={token} disabled={true} />
                <Headline5>Instructions</Headline5>
                <p>TODO</p>
            </ContentWrapper>
        </Modal>
    );
};
