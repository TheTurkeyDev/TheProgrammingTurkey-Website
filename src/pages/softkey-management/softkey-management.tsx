import { ContainedButton, Headline2, Loading, Table, TD, TH, useFetch } from 'gobble-lib-react';
import { SoftkeyApp } from './softkey-app';
import { getDevAPIBase } from '../../network/network-helper';
import { HStack, VStack } from '../../components/stack';
import { SoftkeyAppCreateModal } from './softkey-app-create-modal';
import { useState } from 'react';
import { getParams } from '../../network/auth-network';
import { TR } from '../../components/table-extended';
import { useNavigate } from 'react-router-dom';

export const SoftkeyManagement = () => {

    const navigate = useNavigate();

    const [apps, loading] = useFetch<readonly SoftkeyApp[]>(`${getDevAPIBase()}/softkey`, { requestData: getParams });

    const [showCreateModal, setShowCreateModal] = useState(false);

    if (loading)
        return <Loading />;

    return (
        <VStack>
            <HStack vCenter={true}>
                <Headline2>Softkey</Headline2>
                <ContainedButton onClick={() => setShowCreateModal(true)}>New App</ContainedButton>
            </HStack>
            <Table>
                <thead>
                    <tr>
                        <TH>UUID</TH>
                        <TH>Name</TH>
                    </tr>
                </thead>
                <tbody>
                    {
                        apps?.map(app => (
                            <TR onClick={() => navigate(app.uuid)}>
                                <TD>{app.uuid}</TD>
                                <TD>{app.name}</TD>
                            </TR>
                        ))
                    }
                </tbody>
            </Table>
            {showCreateModal && <SoftkeyAppCreateModal show={true} requestClose={() => setShowCreateModal(false)} />}
        </VStack>
    );
};