import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth-context';
import * as api from '../../network/network';
import { ChanceCubesContentCreatorModal } from '../../modals/chance-cubes/chance-cubes-content-creator-modal';
import { userListDeleteUser } from '../../network/chance-cubes-network';
import { ConfirmationModal, ContainedButton, Input } from '@theturkeydev/gobble-lib-react';
import { CCContentCreator } from '../../types/chance-cubes/chance-cubes-content-creator';

const PageWrapper = styled.div`
    padding: 8px 8px 0 8px;
`;

const InputBard = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 16px;
    margin-bottom: 18px;
`;

export const ChanceCubesManageContentCreators = () => {
    const { authState, authChecked } = useAuth();

    const [userList, setUserList] = useState<readonly CCContentCreator[]>([]);
    const [searchText, setSerachText] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [ccEditing, setCCEditing] = useState<CCContentCreator | undefined>(undefined);

    useEffect(() => {
        async function loadUserList() {
            api.getChanceCubeUserList().then(json => {
                setUserList(json);
            });
        }
        if (authState) loadUserList();
    }, [authChecked]);

    const newUser = () => {
        setCCEditing(undefined);
        setShowModal(true);
    };

    const editUser = (user: CCContentCreator) => {
        setCCEditing(user);
        setShowModal(true);
    };

    const deleteUser = (user: CCContentCreator) => {
        setCCEditing(user);
        setShowDeleteModal(true);
    };

    return (
        <PageWrapper>
            <InputBard>
                <ContainedButton onClick={() => newUser()}>New Content Creator</ContainedButton>
                <Input type='text' name='search' label='Search' value={searchText} onChange={e => setSerachText(e.target.value)} />
            </InputBard>
            <table className='table text-light text-center '>
                <thead>
                    <tr>
                        <th>Actions</th>
                        <th>MC UUID</th>
                        <th>Name</th>
                        <th >Type</th>
                        <th>Twitch</th>
                    </tr>
                </thead>
                <tbody>
                    {userList
                        .filter(
                            user =>
                                user.UUID.includes(searchText) ||
                                user.Name.includes(searchText) ||
                                user.Type.includes(searchText) ||
                                (user.Twitch &&
                                    user.Twitch.includes(searchText))
                        )
                        .map(user => {
                            return (
                                <tr key={user.UUID}>
                                    <td>
                                        <i
                                            className='fas fa-edit clickable'
                                            onClick={() => editUser(user)}
                                        />
                                        <i
                                            className='fas fa-trash clickable'
                                            onClick={() => deleteUser(user)}
                                        />
                                    </td>
                                    <td>{user.UUID}</td>
                                    <td>{user.Name}</td>
                                    <td>{user.Type}</td>
                                    <td>
                                        {user.Twitch ? `#${user.Twitch}` : ''}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <ChanceCubesContentCreatorModal show={showModal} requestClose={() => setShowModal(false)} user={ccEditing} />
            <ConfirmationModal
                show={showDeleteModal}
                text={'Are you sure you want to delete this user?'}
                yesText='Yes'
                onYesClick={() => {
                    setShowDeleteModal(false); userListDeleteUser(ccEditing!.UUID);
                }}
                noText='No'
                onNoClick={() => setShowDeleteModal(false)} />
        </PageWrapper>
    );
};
