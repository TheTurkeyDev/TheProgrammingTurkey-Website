import { useContext, useEffect, useState } from 'react';
import { OverlayContext } from '../../contexts/overlay-context';
import { ToastContext } from '../../contexts/toast-context';
import * as authAPI from '../../network/auth-network';
import { TextToast } from '../../toasts/text-toast';
import { AddUserPermission } from './add-user-permission';

export const UserManageOverlay = (props) => {
    const toast = useContext(ToastContext);
    const overlay = useContext(OverlayContext);

    const [update, setUpdate] = useState(false);

    const [userId, setUserId] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        authAPI.getUserAdmin(props.userId).then((json) => {
            setUserId(json.user_id);
            setDisplayName(json.display_name);
            setPermissions(json.permissions);
        });
    }, [update]);

    const removePerm = (perm) => {
        authAPI.removeUserPermission(props.userId, perm).then((json) => {
            if (json.message)
                toast.pushToast(<TextToast text={json.message} />);
            setUpdate(old => !old);
        });
    };

    const addNewPerm = () => {
        overlay.pushCurrentOverlay(
            <AddUserPermission
                userId={userId}
                assignedPerms={permissions}
                update={() => setUpdate((old) => !old)}
            />
        );
    };

    return (
        <div className='row text-center'>
            <div className='mt-3 container'>
                <div className='row'>
                    <h2 className='col'>Manage User: {displayName}</h2>
                </div>
                <div className='row mt-2'>
                    <label className='col-2'>User ID</label>
                    <input className='col' type='text' value={userId} readOnly />
                </div>
                <div className='row mt-2'>
                    <label className='col-2'>DisplayName</label>
                    <input className='col' type='text' value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
                <hr />
                <div className='row mt-2'>
                    <h4 className='col'>Permissions</h4>
                </div>
                {permissions.map((perm) => {
                    return (
                        <div key={perm} className='row'>
                            <i className='col-auto clickable fas fa-user-minus' onClick={() => removePerm(perm)} />
                            <span className='col-auto mx-auto'>{perm}</span>
                        </div>
                    );
                })}
                <div className='row'>
                    <div className='col mr-2'>
                        <button onClick={() => addNewPerm()}>
                            Add Permission
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
