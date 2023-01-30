import { ConfirmationModal, Input } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../components/icon';

const DependencyWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 8px;
    align-items: center;
    padding: 12px 8px;
`;

type DependencyProps = {
    readonly type: string
    readonly value: string
    readonly color: string
    readonly changeValue: (val: string) => void
    readonly deleteDependency: () => void
}
export const Dependency = ({ type, value, color, changeValue, deleteDependency }: DependencyProps) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <DependencyWrapper style={{ border: `1px solid ${color}` }}>
            <Input type='text' name='dep-input' label={type} value={value} onChange={e => changeValue(e.target.value)} />
            <Icon name=' fas fa-trash' onClick={() => setShowModal(true)} />
            <ConfirmationModal
                show={showModal}
                text={'Are you sure you want to delete this dependency?'}
                yesText='Yes'
                onYesClick={() => {
                    setShowModal(false);
                    deleteDependency();
                }}
                noText='no'
                onNoClick={() => setShowModal(false)}
            />
        </DependencyWrapper>
    );
};
