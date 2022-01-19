import { useEffect, useState } from 'react';
import { useOverlay } from '../../contexts/overlay-context';
import { useToast } from '../../contexts/toast-context';
import * as authAPI from '../../network/auth-network';
import { TextToast } from '../../toasts/text-toast';

export const ConnectMinecraftAccountOverlay = () => {
    const { popCurrentOverlay } = useOverlay();
    const { pushToast } = useToast();

    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState('');

    useEffect(() => {
        authAPI.connectAccount('minecraft').then((json) => {
            if (json.success) {
                setToken(json.data);
            } else {
                pushToast(<TextToast text={json.message} />);
                popCurrentOverlay();
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className='spinner' />;
    }

    return (
        <div className='mr-5 ml-5 mt-2'>
            <div className='mt-3 fluid-container'>
                <div className='row'>
                    <div className='col'>
                        <label>Token</label>
                        <input className='ml-2' type='text' value={token} readOnly />
                    </div>
                </div>
                <div className='row'>
                    <h3 className='col'>Instructions</h3>
                </div>
                <div className='row'>
                    <p className='col'>TODO</p>
                </div>
            </div>
        </div>
    );
}
