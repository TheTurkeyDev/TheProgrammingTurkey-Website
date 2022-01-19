import { Fragment } from 'react';
import styled from 'styled-components';
import { useOverlay } from '../../contexts/overlay-context';
import { ButtonSecondary } from '../../styles/common-styles';

const SelectionWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 8px;
    align-items: center;
`

export const AddNewStreamAnimationOverlay = ({ animations, addAnimation }) => {
    const { popCurrentOverlay } = useOverlay();

    const handleClick = (anim) => {
        addAnimation(anim.id);
        popCurrentOverlay();
    }
    return (
        <div>
            <h2>Add Stream Animation</h2>
            <SelectionWrapper>
                {animations.map(anim => (
                    <Fragment key={anim.id}>
                        <ButtonSecondary onClick={() => { handleClick(anim) }}>Add</ButtonSecondary>
                        <span>{anim.display}</span>
                        <span>TODO:</span>
                    </Fragment>
                ))}
            </SelectionWrapper>
        </div>
    );
}
