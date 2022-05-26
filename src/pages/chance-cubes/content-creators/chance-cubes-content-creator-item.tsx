import { ConfirmationModal, TD } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { ChanceCubesContentCreatorModal } from '../../../modals/chance-cubes/chance-cubes-content-creator-modal';
import { userListDeleteUser } from '../../../network/chance-cubes-network';
import { CCContentCreator } from '../../../types/chance-cubes/chance-cubes-content-creator';

const IconsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 8px;
`;

type ChanceCubesContentCreatorItemProps = {
    readonly user: CCContentCreator;
}

export const ChanceCubesContentCreatorItem = ({ user }: ChanceCubesContentCreatorItemProps) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <tr>
            <TD>
                <IconsWrapper>
                    <i className='fas fa-edit clickable' onClick={() => setShowModal(true)} />
                    <i className='fas fa-trash clickable' onClick={() => setShowDeleteModal(true)} />
                </IconsWrapper>
            </TD>
            <TD>{user.UUID}</TD>
            <TD>{user.Name}</TD>
            <TD>{user.Type}</TD>
            <TD>
                {user.Twitch ? `#${user.Twitch}` : ''}
            </TD>
            <ChanceCubesContentCreatorModal show={showModal} requestClose={() => setShowModal(false)} user={user} />
            <ConfirmationModal
                show={showDeleteModal}
                text={'Are you sure you want to delete this user?'}
                yesText='Yes'
                onYesClick={() => {
                    setShowDeleteModal(false);
                    userListDeleteUser(user.UUID);
                }}
                noText='No'
                onNoClick={() => setShowDeleteModal(false)} />
        </tr>
    );

};