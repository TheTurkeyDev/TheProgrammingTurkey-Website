import { ConfirmationModal, Icon, TD, useQuery } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { ChanceCubesContentCreatorModal } from '../../../modals/chance-cubes/chance-cubes-content-creator-modal';
import { CCContentCreator } from '../../../types/chance-cubes/chance-cubes-content-creator';
import { BasicMessageResponse } from '../../../types/rest-response-wrapper';
import { getDevAPIBase } from '../../../network/network-helper';
import { deleteParams } from '../../../network/auth-network';

const IconsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 8px;
`;

type ChanceCubesContentCreatorItemProps = {
    readonly user: CCContentCreator;
}

export const ChanceCubesContentCreatorItem = ({ user }: ChanceCubesContentCreatorItemProps) => {

    const [deleteUser] = useQuery<BasicMessageResponse>(`${getDevAPIBase()}/chancecubes/userlist`, { requestData: deleteParams });

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <tr>
            <TD>
                <IconsWrapper>
                    <Icon className='fas fa-edit' onClick={() => setShowModal(true)} />
                    <Icon className='fas fa-trash' onClick={() => setShowDeleteModal(true)} />
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
                text='Are you sure you want to delete this user?'
                yesText='Yes'
                onYesClick={() => {
                    setShowDeleteModal(false);
                    deleteUser(undefined, user.UUID);
                }}
                noText='No'
                onNoClick={() => setShowDeleteModal(false)} />
        </tr>
    );

};