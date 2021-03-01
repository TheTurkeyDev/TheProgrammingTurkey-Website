import React, { useEffect, useState } from 'react';
import { OverlayContext } from '../../contexts/overlay-context';

import * as authAPI from '../../network/auth-network';

export function AccountMergeOverlay() {
    const overlay = useContext(OverlayContext);
    const [forPlatform, setForPlatform] = useState("");
    const [fromAccount, setFromAccount] = useState("");

    useEffect(() => {
        authAPI.getMergeRequests().then(resp => {

        });
    }, []);

    return (
        <div className="mr-5 ml-5 mt-2">
            <div className="mt-3 fluid-container">
                <div className="row">
                    <div className="col">
                        <p>
                            A Merge request has been made by {fromAccount} for the {forPlatform} platform currently linked to this account.
                        </p>
                        <p>
                            Would you like to confirm this merge? Stored data related to this account and/or platform may be lost!
                        </p>
                    </div>
                </div>
                <div className="row">
                    <button className="col m-auto">Confirm</button>
                    <button className="col m-auto" onClick={() => overlay.popCurrentOverlay()}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
