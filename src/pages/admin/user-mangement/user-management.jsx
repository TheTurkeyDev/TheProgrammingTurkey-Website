import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserManagementPlatforms } from './user-management-platforms';
import { OverlayContext } from '../../../contexts/overlay-context';
import * as authAPI from '../../../network/auth-network';
import { UserManageOverlay } from '../../../overlays/admin/user-manage-overlay';

const PageWrapper = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    margin: 8px 8px 0 8px;
`;

const FiltersWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px;
    margin-bottom: 8px;
`;

export const UserManagement = () => {
    const overlay = useContext(OverlayContext);

    const [userList, setUserList] = useState([]);

    const [updateUsers, setUpdateUsers] = useState(false);
    const [usernameFilter, setUsernameFilter] = useState('');

    useEffect(() => {
        authAPI.getAllUsers(usernameFilter, ['twitch', 'discord', 'github']).then(json => {
            setUserList(json);
        });
    }, [updateUsers]);

    const editUser = (user) => {
        overlay.pushCurrentOverlay(<UserManageOverlay userId={user.user_id} />);
    };

    return (
        <PageWrapper>
            <FiltersWrapper>
                <button onClick={() => setUpdateUsers((old) => !old)}>
                    Update
                </button>
                <div>
                    <label>Username</label>
                    <input type='text' value={usernameFilter} onChange={e => setUsernameFilter(e.target.value)} />
                </div>
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
                    {userList.sort((a, b) => a.user_id.localeCompare(b.user_id)).map(user => {
                        return (
                            <tr key={user.user_id} className='clickable' onClick={() => editUser(user)}>
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
        </PageWrapper>
    );
}
