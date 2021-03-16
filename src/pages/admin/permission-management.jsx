import { useContext, useEffect, useState } from 'react';
import { OverlayContext } from '../../contexts/overlay-context';
import * as authAPI from '../../network/auth-network';
import { AuthPageWrapper } from '../base/auth-page-wrapper';

import { NewPermissionOverlay } from '../../overlays/admin/new-permission-overlay';
import { ConfirmationOverlay } from '../../overlays/confirmation-overlay';
import { ToastContext } from '../../contexts/toast-context';
import { TextToast } from '../../toasts/text-toast';

export const PermissionManagement = (props) => {
    const toast = useContext(ToastContext);
    const overlay = useContext(OverlayContext);

    const [permissionList, setPermissionList] = useState([]);

    const [updatePermissions, setUpdatePersmissions] = useState(false);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        authAPI.getAllPermissions(filter).then((json) => {
            setPermissionList(json);
        });
    }, [updatePermissions]);

    const addNewPerm = () => {
        overlay.pushCurrentOverlay(
            <NewPermissionOverlay
                update={() => setUpdatePersmissions((old) => !old)}
            />
        );
    };

    const deletePermConfirm = (perm) => {
        authAPI.deletePermission(perm.permission).then((json) => {
            if (json.message)
                toast.pushToast(<TextToast text={json.message} />);
            setUpdatePersmissions((old) => !old);
        });
    };

    const deletePerm = (perm) => {
        overlay.pushCurrentOverlay(
            <ConfirmationOverlay
                text={`Are you sure you want to delete the permission ${perm.permission}?`}
                options={[
                    {
                        text: 'Yes',
                        callback: () => {
                            overlay.popCurrentOverlay();
                            deletePermConfirm(perm);
                        },
                    },
                    { text: 'No', callback: () => overlay.popCurrentOverlay() },
                ]}
            />
        );
    };

    return (
        <AuthPageWrapper history={props.history} perm='admin.managepermissions' parent='/user/profile'>
            <div className='mr-5 ml-5 mt-2'>
                <div className='mt-3 fluid-container'>
                    <div className='row'>
                        <div className='col mr-2'>
                            <button onClick={() => addNewPerm()}>
                                New Permission
                            </button>
                        </div>
                        <div className='col mr-2'>
                            <button onClick={() => { }}>
                                Update
                            </button>
                        </div>
                        <div className='col'>
                            <label>Filter</label>
                            <input className='ml-2' type='text' value={filter} onChange={(e) => setFilter(e.target.value)} />
                        </div>
                    </div>
                </div>
                <table className='table text-light text-center '>
                    <thead>
                        <tr>
                            <th scope='col-auto'>Actions</th>
                            <th scope='col-auto'>Permission</th>
                            <th scope='col'>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            permissionList.map((perm) => (
                                <tr key={perm.permission}>
                                    <th scope='row'>
                                        <i className='fas fa-edit clickable mr-2' />
                                        <i className='fas fa-trash clickable' onClick={() => deletePerm(perm)} />
                                    </th>
                                    <td>{perm.permission}</td>
                                    <td>{perm.description}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </AuthPageWrapper>
    );
}
