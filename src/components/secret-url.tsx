import { Body1, ButtonRow, ContainedButton, DualOptionModal, Input, InputsWrapper, OutlinedButton, TextToast, useToast } from 'gobble-lib-react';
import { useState } from 'react';

type SecretURLProps = {
    readonly url: string
    readonly regen: () => void
}
export const SecretURL = ({ url, regen }: SecretURLProps) => {
    const { pushToast } = useToast();

    const [showURL, setShowURL] = useState(false);
    const [confirmRegen, setConfirmRegen] = useState(false);

    return (
        <InputsWrapper $fullWidth={true}>
            <Input label='URL' type={showURL ? 'text' : 'password'} readOnly value={url} onClick={() => { navigator.clipboard.writeText(url); pushToast(<TextToast text='Copied to Clipboard!' />); }} />
            <div />
            <ButtonRow>
                <OutlinedButton onClick={() => setConfirmRegen(true)}>Regen Token</OutlinedButton>
                <ContainedButton onClick={() => setShowURL(old => !old)}>{showURL ? 'Hide' : 'Show'} URL</ContainedButton>
            </ButtonRow>
            <DualOptionModal
                show={confirmRegen}
                primaryText='Yes'
                onPrimaryClick={regen}
                secondaryText='No'
                onSecondaryClick={() => setConfirmRegen(false)} >
                <Body1>Are you sure you want to regen this? Anything currently using this will stop working!</Body1>
            </DualOptionModal>
        </InputsWrapper>
    );
};