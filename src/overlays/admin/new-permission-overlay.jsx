import { useState } from 'react';
import { useOverlay } from '../../contexts/overlay-context';
import { useToast } from '../../contexts/toast-context';
import * as authAPI from '../../network/auth-network';
import { TextToast } from '../../toasts/text-toast';

export const NewPermissionOverlay = (props) => {
    const { pushToast } = useToast();
    const { popCurrentOverlay } = useOverlay();

    const [permissionID, setPermissionID] = useState('');
    const [description, setDescription] = useState('');

    const createPerm = () => {
        if (!permissionID) {
            pushToast(<TextToast text={'Permission ID not set!'} />);
            return;
        }

        if (!description) {
            pushToast(<TextToast text={'Description not set!'} />);
            return;
        }

        authAPI.createPermission(permissionID, description).then((json) => {
            if (json.message)
                pushToast(<TextToast text={json.message} />);
            popCurrentOverlay();
            props.update();
        });
    };

    return (
        <div className='row text-center'>
            <div className='mt-3 container'>
                <div className='row'>
                    <h2 className='col'>Add New Permission</h2>
                </div>
                <div className='row mt-2'>
                    <label className='col-2'>Permission ID</label>
                    <input className='col' type='text' value={permissionID} onChange={(e) => setPermissionID(e.target.value)} />
                </div>
                <div className='row mt-2'>
                    <label className='col-2'>Description</label>
                    <input className='col' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='row mt-2'>
                    <button className='col-auto mx-auto' onClick={() => createPerm()}  >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
