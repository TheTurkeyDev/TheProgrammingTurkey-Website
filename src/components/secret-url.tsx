import { ButtonRow, ContainedButton, Input, InputsWrapper, OutlinedButton, TextToast, useToast } from '@theturkeydev/gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';

type SecretURLProps = {
    readonly url: string
    readonly regen: () => void
}
export const SecretURL = ({ url, regen }: SecretURLProps) => {
    const { pushToast } = useToast();

    const [showURL, setShowURL] = useState(false);

    return (
        <InputsWrapper fullWidth={true}>
            <Input label='URL' type={showURL ? 'text' : 'password'} readOnly value={url} onClick={() => { navigator.clipboard.writeText(url); pushToast(<TextToast text='Copied to Clipboard!' />); }} />
            <div />
            <ButtonRow>
                <OutlinedButton onClick={regen}>Regen Token</OutlinedButton>
                <ContainedButton onClick={() => setShowURL(old => !old)}>{showURL ? 'Hide' : 'Show'} URL</ContainedButton>
            </ButtonRow>
        </InputsWrapper>
    );
};