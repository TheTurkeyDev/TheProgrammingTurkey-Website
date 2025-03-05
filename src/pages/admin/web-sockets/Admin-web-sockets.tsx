import { Headline2, Loading, Table, TD, TH, useFetch } from 'gobble-lib-react';
import { getDevAPIBase } from '../../../network/network-helper';
import { AdminSocketInfo } from './admin-socket-info';
import { getParams } from '../../../network/auth-network';

export const AdminWebSockets = () => {

    const [connections, loading] = useFetch<readonly AdminSocketInfo[]>(`${getDevAPIBase()}/admin/web-sockets`, { requestData: getParams });

    if (loading)
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
                                <TD>{c.userID}</TD>
                                <TD>{c.service}</TD>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
};