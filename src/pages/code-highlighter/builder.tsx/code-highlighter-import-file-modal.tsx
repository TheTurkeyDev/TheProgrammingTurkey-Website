import { ButtonRow, ContainedButton, Headline4, Input, InputsWrapper, Label, Modal, OutlinedButton } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr;
    justify-items: center;
`;

const CodeWrapper = styled.div`
    max-width: 800px;
    height: 300px;
    overflow: auto;
`;

const PreWrapper = styled.pre`
    color: white;
`;

type ImportFileModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly importCode: (name: string, code: string) => void
}
export const ImportFileModal = ({ show, requestClose, importCode }: ImportFileModalProps) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [code, setCode] = useState('');

    const importURLContents = () => {
        fetch(url).then(resp => resp.text()).then(t => setCode(t));
    };
    const importFileContents = (file?: File) => file?.text().then(t => setCode(t));

    console.log(code);
    return (
        <Modal show={show} requestClose={requestClose}>
            <Wrapper>
                <Headline4>Import File</Headline4>
                <InputsWrapper fullWidth={true}>
                    <Input label='Name' type='text' value={name} onChange={e => setName(e.target.value)} />
                    <Input label='File' type='file' onChange={e => importFileContents(e.target.files ? e.target.files[0] : undefined)} />
                    <Label>URL</Label>
                    <InputsWrapper fullWidth={true}>
                        <Input label='' type='text' value={url} onChange={e => setUrl(e.target.value)} />
                        <OutlinedButton onClick={() => importURLContents()}>Get</OutlinedButton>
                    </InputsWrapper>
                </InputsWrapper>
                <CodeWrapper>
                    <PreWrapper>
                        <code>
                            {code}
                        </code>
                    </PreWrapper>
                </CodeWrapper>
                <ButtonRow>
                    <OutlinedButton onClick={() => requestClose()}>Cancel</OutlinedButton>
                    {/* TODO: Make sure name is set to not empty */}
                    <ContainedButton onClick={() => { importCode(name, code); }}>Import</ContainedButton>
                </ButtonRow>
            </Wrapper>
        </Modal>
    );
};