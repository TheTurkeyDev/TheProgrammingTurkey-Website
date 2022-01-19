import { useEffect, useState } from 'react';
import { useOverlay } from '../../contexts/overlay-context';
import { useToast } from '../../contexts/toast-context';
import * as authAPI from '../../network/auth-network';
import { NewPermissionOverlay } from '../../overlays/admin/new-permission-overlay';
import { ConfirmationOverlay } from '../../overlays/confirmation-overlay';
import { TextToast } from '../../toasts/text-toast';
import styled from 'styled-components';

const PageWrapper = styled.div`
    margin: 16px;
`;

const HeaderInputsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    gap: 16px;
`

const TableWrapper = styled.table`
    margin-top: 8px;
`;

export const PermissionManagement = () => {
    const { pushCurrentOverlay, popCurrentOverlay } = useOverlay();
    const { pushToast } = useToast();

    const [permissionList, setPermissionList] = useState([]);

    const [updatePermissions, setUpdatePersmissions] = useState(false);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        authAPI.getAllPermissions(filter).then((json) => {
            setPermissionList(json);
        });
    }, [updatePermissions]);

    const addNewPerm = () => {
        pushCurrentOverlay(
            <NewPermissionOverlay
                update={() => setUpdatePersmissions((old) => !old)}
            />
        );
    };

    const deletePermConfirm = (perm) => {
        authAPI.deletePermission(perm.permission).then((json) => {
            if (json.message)
                pushToast(<TextToast text={json.message} />);
            setUpdatePersmissions((old) => !old);
        });
    };

    const deletePerm = (perm) => {
        pushCurrentOverlay(
            <ConfirmationOverlay
                text={`Are you sure you want to delete the permission ${perm.permission}?`}
                options={[
                    {
                        text: 'Yes',
                        callback: () => {
                            popCurrentOverlay();
                            deletePermConfirm(perm);
                        },
                    },
                    { text: 'No', callback: () => popCurrentOverlay() },
                ]}
            />
        );
    };

    return (
        <PageWrapper>
            <HeaderInputsWrapper>
                <button onClick={() => addNewPerm()}>
                    New Permission
                </button>
                <button onClick={() => { }}>
                    Update
                </button>
                <div>
                    <label>Filter</label>
                    <input type='text' value={filter} onChange={(e) => setFilter(e.target.value)} />
                </div>
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
                        permissionList.map((perm) => (
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
        </PageWrapper>
    );
}
