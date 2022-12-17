import { useEffect, useState } from 'react';
import * as authAPI from '../../../network/auth-network';
import { NewPermissionModal } from '../../../modals/admin/new-permission-modal';
import styled from 'styled-components';
import { ContainedButton, Input, Table, TextToast, TH, useToast } from 'gobble-lib-react';
import { Permission } from '../../../types/permission';
import { PermissionManagementItem } from './permission-management-item';

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

    const [permissionList, setPermissionList] = useState<readonly Permission[]>([]);

    const [updatePermissions, setUpdatePersmissions] = useState(false);
    const [filter, setFilter] = useState('');
    const [showNewPermModal, setShowNewPermModal] = useState(false);

    useEffect(() => {
        authAPI.getAllPermissions(filter).then(json => {
            setPermissionList(json);
        });
    }, [updatePermissions]);

    const deletePerm = (perm: Permission) => {
        authAPI.deletePermission(perm.permission).then(json => {
            if (json.message)
                pushToast(<TextToast text={json.message} />);
            setUpdatePersmissions(old => !old);
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
            <NewPermissionModal show={showNewPermModal} requestClose={() => setShowNewPermModal(false)} update={() => setUpdatePersmissions(old => !old)} />
        </PageWrapper>
    );
};
