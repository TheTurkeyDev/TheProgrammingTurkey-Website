import { useEffect, useState } from 'react';
import * as authAPI from '../../network/auth-network';
import { NewPermissionModal } from '../../modals/admin/new-permission-modal';
import styled from 'styled-components';
import { ConfirmationModal, ContainedButton, Input, TextToast, useToast } from '@theturkeydev/gobble-lib-react';
import { Persmission } from '../../types/permission';

const PageWrapper = styled.div`
    margin: 16px;
`;

const HeaderInputsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    gap: 16px;
`;

const TableWrapper = styled.table`
    margin-top: 8px;
`;

export const PermissionManagement = () => {
    const { pushToast } = useToast();

    const [permissionList, setPermissionList] = useState<readonly Persmission[]>([]);

    const [updatePermissions, setUpdatePersmissions] = useState(false);
    const [filter, setFilter] = useState('');
    const [showNewPermModal, setShowNewPermModal] = useState(false);
    const [showDeletePermModal, setShowDeletePermModal] = useState(false);
    const [permToDelete, setPermToDelete] = useState<Persmission | null>(null);

    useEffect(() => {
        authAPI.getAllPermissions(filter).then(json => {
            setPermissionList(json);
        });
    }, [updatePermissions]);

    const deletePermConfirm = (perm: Persmission) => {
        authAPI.deletePermission(perm.permission).then(json => {
            if (json.message)
                pushToast(<TextToast text={json.message} />);
            setUpdatePersmissions(old => !old);
        });
    };

    const deletePerm = (perm: Persmission) => {
        setPermToDelete(perm);
        setShowDeletePermModal(true);
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
            <TableWrapper className='table text-light'>
                <thead>
                    <tr>
                        <th>Actions</th>
                        <th>Permission</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        permissionList.map(perm => (
                            <tr key={perm.permission}>
                                <th>
                                    <i className='fas fa-edit clickable mr-2' />
                                    <i className='fas fa-trash clickable' onClick={() => deletePerm(perm)} />
                                </th>
                                <td>{perm.permission}</td>
                                <td>{perm.description}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </TableWrapper>
            <NewPermissionModal show={showNewPermModal} requestClose={() => setShowNewPermModal(false)} update={() => setUpdatePersmissions(old => !old)} />
            {
                showDeletePermModal &&
                < ConfirmationModal
                    show={showDeletePermModal && !!permToDelete}
                    text={`Are you sure you want to delete the permission ${permToDelete!.permission}?`}
                    yesText='Yes'
                    onYesClick={() => {
                        setShowDeletePermModal(false);
                        deletePermConfirm(permToDelete!);
                    }}
                    noText='No'
                    onNoClick={() => setShowDeletePermModal(false)}
                />
            }
        </PageWrapper>
    );
};
