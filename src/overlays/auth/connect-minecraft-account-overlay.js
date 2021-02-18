import React, { useContext, useEffect, useState } from 'react';
import { OverlayContext } from '../../contexts/overlay-context';
import { ToastContext } from '../../contexts/toast-context';
import * as authAPI from '../../network/auth-network';
import { TextToast } from '../../toasts/text-toast';

export function ConnectMinecraftAccountOverlay() {
    const toast = useContext(ToastContext);
    const overlay = useContext(OverlayContext);

    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState('');

    useEffect(() => {
        authAPI.connectAccount('minecraft').then((json) => {
            if (json.success) {
                setToken(json.data);
            } else {
                toast.pushToast(<TextToast text={json.message} />);
                overlay.popCurrentOverlay();
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="spinner"></div>;
    }

    return (
        <div className="mr-5 ml-5 mt-2">
            <div className="mt-3 fluid-container">
                <div className="row">
                    <div className="col">
                        <label>Token</label>
                        <input
                            className="ml-2"
                            type="text"
                            value={token}
                            readOnly
                        />
                    </div>
                </div>
                <div className="row">
                    <h3 className="col">Instructions</h3>
                </div>
                <div className="row">
                    <p className="col">TODO</p>
                </div>
            </div>
        </div>
    );
}
