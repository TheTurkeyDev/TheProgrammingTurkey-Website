import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserManagementPlatforms } from './user-management-platforms';
import * as authAPI from '../../../network/auth-network';
import { UserManageModal } from '../../../modals/admin/user-manage-modal';
import { ContainedButton, Input } from '@theturkeydev/gobble-lib-react';
import { UserAndPlatform } from '../../../types/user-and-platform';

const PageWrapper = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    margin: 8px 8px 0 8px;
`;

const FiltersWrapper = styled.div`
    display: grid;
    grid-template-columns: auto  auto 1fr;
    gap: 16px;
    margin-bottom: 8px;
`;

export const UserManagement = () => {
    const [userList, setUserList] = useState<readonly UserAndPlatform[]>([]);

    const [updateUsers, setUpdateUsers] = useState(false);
    const [usernameFilter, setUsernameFilter] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState('');

    useEffect(() => {
        authAPI.getAllUsers(usernameFilter, ['twitch', 'discord', 'github']).then(json => {
            setUserList(json);
        });
    }, [updateUsers]);

    return (
        <PageWrapper>
            <FiltersWrapper>
                <ContainedButton onClick={() => setUpdateUsers(old => !old)}>
                    Update
                </ContainedButton>
                <Input type='text' name='username' label='Username' value={usernameFilter} onChange={e => setUsernameFilter(e.target.value)} />
            </FiltersWrapper>
            <table className='table text-light text-center '>
                <thead>
                    <tr>
                        <th>Platforms</th>
                        <th>Username</th>
                        <th>User ID</th>
                    </tr>
                </thead>
                <tbody>
                    {[...userList].sort((a, b) => a.user_id.localeCompare(b.user_id)).map(user => {
                        return (
                            <tr key={user.user_id} className='clickable' onClick={() => { setEditingUser(user.user_id); setShowModal(true); }}>
                                <td>
                                    <UserManagementPlatforms platfroms={user.platforms} />
                                </td>
                                <td>{user.display_name}</td>
                                <td>{user.user_id}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <UserManageModal show={showModal} requestClose={() => setShowModal(false)} userId={editingUser} />
        </PageWrapper>
    );
};
