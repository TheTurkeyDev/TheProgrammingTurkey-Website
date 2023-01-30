import { TextButton, WithChildren } from 'gobble-lib-react';
import styled from 'styled-components';
import { Icon } from '../../../components/icon';

const DirectiveBaseDisplayWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    border: 1px solid green;
`;

const DirectiveControllsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto 1fr auto;
    border-right: 1px solid green;
`;

type DirectiveBaseDisplayProps = WithChildren & {
    readonly onDelete: () => void
    readonly onMove: (up: boolean) => void
}

export const DirectiveBaseDisplay = ({ children, onDelete, onMove }: DirectiveBaseDisplayProps) => {
    return (
        <DirectiveBaseDisplayWrapper>
            <DirectiveControllsWrapper>
                <TextButton onClick={() => onMove(true)}>
                    <Icon name='fas fa-arrow-up' />
                </TextButton>
                <div></div>
                <TextButton onClick={onDelete}>
                    <Icon name='fas fa-trash' />
                </TextButton>
                <div></div>
                <TextButton onClick={() => onMove(false)}>
                    <Icon name='fas fa-arrow-down' />
                </TextButton>
            </ DirectiveControllsWrapper>
            {children}
        </DirectiveBaseDisplayWrapper>
    );
};