import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ContainedButton, Input, Table, TH, useQuery } from 'gobble-lib-react';
import { UserAndPlatform } from '../../../types/user-and-platform';
import { UserManagementUserItem } from './user-management-user-item';
import { getDevAPIBase } from '../../../network/network-helper';
import { getParams } from '../../../network/auth-network';

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

    const [getAllUsers] = useQuery<readonly UserAndPlatform[]>(`${getDevAPIBase()}/admin/users`, { requestData: getParams });

    const [userList, setUserList] = useState<readonly UserAndPlatform[]>([]);
    const [usernameFilter, setUsernameFilter] = useState('');

    const updateUsers = () => {
        getAllUsers(undefined, '', `filter=${usernameFilter}&platforms=${['twitch', 'discord', 'github'].join(',')}`)
            .then(resp => setUserList(resp ?? []));
    };

    useEffect(() => updateUsers(), []);

    return (
        <PageWrapper>
            <FiltersWrapper>
                <ContainedButton onClick={updateUsers}>
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
                        <TH>Created At</TH>
                    </tr>
                </thead>
                <tbody>
                    {[...userList]
                        .sort((a, b) => new Date(b.user_info.created_at).getTime() - new Date(a.user_info.created_at).getTime())
                        .map(user => <UserManagementUserItem key={user.user_info.user_id} user={user} />)}
                </tbody>
            </Table>
        </PageWrapper>
    );
};
