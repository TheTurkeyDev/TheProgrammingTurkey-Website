import { Modal } from 'gobble-lib-react';
import styled from 'styled-components';
import { Mapped } from '../../../types/mapped';

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns:1fr;
    gap: 8px;
    justify-items: center;
    min-width: 500px;
    min-height: 500px;
`;

type RewardImportModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly nbt: Mapped
}
export const NBTEditModal = ({ show, requestClose }: RewardImportModalProps) => {
    return (
        <Modal show={show} requestClose={requestClose}>
            <ContentWrapper>

            </ContentWrapper>
        </Modal>
    );
};