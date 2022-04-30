import { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as authAPI from '../../../network/auth-network';
import { UserManageModal } from '../../../modals/admin/user-manage-modal';
import { ContainedButton, Input, Table, TD, TH } from '@theturkeydev/gobble-lib-react';
import { UserAndPlatform } from '../../../types/user-and-platform';
import { UserManagementUserItem } from './user-management-user-item';

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
    align-items: center;
`;

export const UserManagement = () => {
    const [userList, setUserList] = useState<readonly UserAndPlatform[]>([]);

    const [updateUsers, setUpdateUsers] = useState(false);
    const [usernameFilter, setUsernameFilter] = useState('');

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
            <Table>
                <thead>
                    <tr>
                        <TH>Platforms</TH>
                        <TH>Username</TH>
                        <TH>User ID</TH>
                    </tr>
                </thead>
                <tbody>
                    {[...userList].sort((a, b) => a.user_id.localeCompare(b.user_id)).map(user => <UserManagementUserItem key={user.user_id} user={user} />)}
                </tbody>
            </Table>
        </PageWrapper>
    );
};
