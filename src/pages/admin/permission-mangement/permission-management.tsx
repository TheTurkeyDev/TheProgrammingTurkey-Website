import { useEffect, useState } from 'react';
import { NewPermissionModal } from '../../../modals/admin/new-permission-modal';
import styled from 'styled-components';
import { ContainedButton, Input, Table, TextToast, TH, useQuery, useToast } from 'gobble-lib-react';
import { Permission } from '../../../types/permission';
import { PermissionManagementItem } from './permission-management-item';
import { deleteParams, getParams } from '../../../network/auth-network';
import { getDevAPIBase } from '../../../network/network-helper';
import { BasicMessageResponse } from '../../../types/rest-response-wrapper';

const PageWrapper = styled.div`
    margin: 16px;
    display: grid;
    gap: 8px;
`;

const HeaderInputsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    gap: 16px;
    align-items: center;
`;

export const PermissionManagement = () => {
    const { pushToast } = useToast();

    const [getPermissions] = useQuery<readonly Permission[]>(`${getDevAPIBase()}/admin/permissions`, { requestData: getParams });
    const [deletePermissions] = useQuery<BasicMessageResponse>(`${getDevAPIBase()}/admin/permissions`, { requestData: deleteParams });

    const [permissionList, setPermissionList] = useState<readonly Permission[]>([]);
    const [filter, setFilter] = useState('');
    const [showNewPermModal, setShowNewPermModal] = useState(false);

    const updatePermissionList = () => getPermissions(undefined, '', `filter=${filter}`).then(resp => setPermissionList(resp ?? []));

    useEffect(() => {
        updatePermissionList();
    }, [filter]);

    const deletePerm = (perm: Permission) => {
        deletePermissions(undefined, perm.permission).then(json => {
            if (json?.message)
                pushToast(<TextToast text={json.message} />);
            updatePermissionList();
        });
    };

    return (
        <PageWrapper>
            <HeaderInputsWrapper>
                <ContainedButton onClick={() => setShowNewPermModal(true)}>
                    New Permission
                </ContainedButton>
                <ContainedButton onClick={() => { }}>
                    Update
                </ContainedButton>
                <Input type='text' name='filter' label='Filter' value={filter} onChange={e => setFilter(e.target.value)} />
            </HeaderInputsWrapper>
            <Table>
                <thead>
                    <tr>
                        <TH>Actions</TH>
                        <TH>Permission</TH>
                        <TH>Description</TH>
                    </tr>
                </thead>
                <tbody>
                    {
                        permissionList.map(perm => <PermissionManagementItem perm={perm} deletePerm={deletePerm} />)
                    }
                </tbody>
            </Table>
            <NewPermissionModal show={showNewPermModal} requestClose={() => setShowNewPermModal(false)} update={() => updatePermissionList()} />
        </PageWrapper>
    );
};
