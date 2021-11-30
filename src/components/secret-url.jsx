import { useContext, useState } from 'react';
import styled from 'styled-components';
import { ToastContext } from '../contexts/toast-context';
import { Button } from '../styles/common-styles';
import { TextToast } from '../toasts/text-toast';

const URLWrapper = styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: auto 1fr;
    align-content: center;
`
const URLLabel = styled.label`
    font-size: 22px;
    max-width: 100px;
    margin: 0;
`;

const URLInput = styled.input`
    border-radius: 8px;
    background-color: #d1d1d1;
    color: #232323;
`;

const ButtonsWrapper = styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: auto auto 1fr;
`

export const SecretURL = ({ url, regen }) => {

    const toast = useContext(ToastContext);

    const [showURL, setShowURL] = useState(false);

    return (
        <URLWrapper>
            <URLLabel>
                URL:
            </URLLabel>
            <URLInput type={showURL ? 'text' : 'password'} readOnly value={url} onClick={() => { navigator.clipboard.writeText(url); toast.pushToast(<TextToast text='Copied to Clipboard!' />) }} />
            <URLLabel />
            <ButtonsWrapper>
                <Button onClick={regen}>Regen Token</Button>
                <Button onClick={() => setShowURL(old => !old)}>{showURL ? 'Hide' : 'Show'} Token</Button>
            </ButtonsWrapper>
        </URLWrapper>
    )
}