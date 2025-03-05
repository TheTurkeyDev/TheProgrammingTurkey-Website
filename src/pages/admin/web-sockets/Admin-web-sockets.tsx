import { Headline2, Loading, Table, TD, TH, useFetch, useQuery } from 'gobble-lib-react';
import { getDevAPIBase } from '../../../network/network-helper';
import { AdminSocketInfo } from './admin-socket-info';
import { getParams } from '../../../network/auth-network';
import { useEffect, useState } from 'react';
import { UserInfo } from '../../../types/user-info';

export const AdminWebSockets = () => {

    const [connections, loading] = useFetch<readonly AdminSocketInfo[]>(`${getDevAPIBase()}/admin/web-sockets`, { requestData: getParams });
    const [getUsers, loadingUsers] = useQuery<readonly UserInfo[]>(`${getDevAPIBase()}/admin/users`, { requestData: getParams, shouldThrow: true });

    const [users, setUsers] = useState<readonly UserInfo[]>([]);

    useEffect(() => {
        getUsers(undefined, undefined, `userIds=${connections?.map(c => c.userID).join(',')}`)
            .then(resp => resp && setUsers(resp));
    }, [connections]);

    if (loading || loadingUsers)
        return <Loading />;

    return (
        <div>
            <Headline2>Connections</Headline2>
            <Table>
                <thead>
                    <tr>
                        <TH>User</TH>
                        <TH>Service</TH>
                    </tr>
                </thead>
                <tbody>
                    {
                        connections?.map(c => (
                            <tr>
                                <TD>{users.find(u => u.userId === c.userID)?.displayName ?? 'MISSING??'}</TD>
                                <TD>{c.service}</TD>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
};