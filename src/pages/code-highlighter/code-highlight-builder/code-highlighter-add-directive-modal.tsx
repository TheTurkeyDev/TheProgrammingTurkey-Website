import { Headline4, Modal, OutlinedButton } from 'gobble-lib-react';
import styled from 'styled-components';
import { DirectiveType } from './directives-type';

const Wrapper = styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr;
    justify-items: center;
`;

type AddDirectiveModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly addNewDirective: (type: DirectiveType) => void
}
export const AddDirectiveModal = ({ show, requestClose, addNewDirective }: AddDirectiveModalProps) => {
    return (
        <Modal show={show} requestClose={requestClose}>
            <Wrapper>
                <Headline4>Add Directive</Headline4>
                <OutlinedButton onClick={() => addNewDirective(DirectiveType.TITLE)}>Title Card</OutlinedButton>
                <OutlinedButton onClick={() => addNewDirective(DirectiveType.HIGHLIGHT)}>Code Highlight</OutlinedButton>
            </Wrapper>
        </Modal>
    );
};