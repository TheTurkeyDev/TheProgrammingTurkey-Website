import { useEffect, useState } from 'react';
import { useOverlay } from '../../contexts/overlay-context';
import { useToast } from '../../contexts/toast-context';
import * as authAPI from '../../network/auth-network';
import { TextToast } from '../../toasts/text-toast';

export const AddUserPermission = (props) => {
    const { pushToast } = useToast();
    const { popCurrentOverlay } = useOverlay();

    const [permissionList, setPermissionList] = useState([]);

    const [filter, setFilter] = useState('');

    useEffect(() => {
        authAPI.getAllPermissions(filter).then((json) => {
            setPermissionList(
                json.filter(
                    (perm) => !props.assignedPerms.includes(perm.permission)
                )
            );
        });
    }, []);

    const givePerm = (perm) => {
        authAPI.giveUserPermission(props.userId, perm).then((json) => {
            if (json.message)
                pushToast(<TextToast text={json.message} />);
            popCurrentOverlay();
            props.update();
        });
    };

    return (
        <div className='mr-5 ml-5 mt-2'>
            <div className='mt-3 fluid-container'>
                <div className='row'>
                    <div className='col'>
                        <label>Filter</label>
                        <input className='ml-2' type='text' value={filter} onChange={(e) => setFilter(e.target.value)} />
                    </div>
                </div>
            </div>
            <table className='table text-light text-center '>
                <thead>
                    <tr>
                        <th scope='col-auto'></th>
                        <th scope='col-auto'>Permission</th>
                        <th scope='col'>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        permissionList.map((perm) => (
                            <tr key={perm.permission}>
                                <th scope='row'>
                                    <i className='fas fa-plus clickable' onClick={() => givePerm(perm.permission)} />
                                </th>
                                <td>{perm.permission}</td>
                                <td>{perm.description}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
