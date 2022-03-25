import { Body2, ContainedButton, Headline3, Modal } from '@theturkeydev/gobble-lib-react';
import { Fragment } from 'react';
import styled from 'styled-components';
import { StreamAnimation } from '../types/stream-animations/stream-animation';

const SelectionWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 8px;
    align-items: center;
`;

type AddNewStreamAnimationModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly animations: readonly StreamAnimation[]
    readonly addAnimation: (animationId: string) => void
}
export const AddNewStreamAnimationModal = ({ show, requestClose, animations, addAnimation }: AddNewStreamAnimationModalProps) => {

    const handleClick = (anim: StreamAnimation) => {
        addAnimation(anim.id);
        requestClose();
    };
    return (
        <Modal show={show} requestClose={requestClose}>
            <Headline3>Add Stream Animation</Headline3>
            <SelectionWrapper>
                {animations.map(anim => (
                    <Fragment key={anim.id}>
                        <ContainedButton onClick={() => { handleClick(anim); }}>Add</ContainedButton>
                        <Body2>{anim.display}</Body2>
                        <Body2>TODO:</Body2>
                    </Fragment>
                ))}
            </SelectionWrapper>
        </Modal>
    );
};
