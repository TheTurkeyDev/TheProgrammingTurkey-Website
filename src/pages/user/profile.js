import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { AuthPageWrapper } from '../../pages/base/auth-page-wrapper';
import { ProfileProjectGroup } from './profile-project-groups';
import * as authApi from '../../network/auth-network';

export function UserProfile(props) {
    const auth = useContext(AuthContext);

    const [betaApps, setBetaApps] = useState([]);
    const [adminApps, setAdminApps] = useState([]);

    useEffect(() => {
        authApi.getUserProfileApps(false).then(json => {
            setBetaApps(json);
        });
        authApi.getUserProfileApps(true).then(json => {
            setAdminApps(json);
        });
    }, []);

    const adminShow = auth.permissions.some((perm) =>
        adminApps.find(aa => perm.match(aa.perm) != null)
    );

    return (
        <AuthPageWrapper history={props.history}>
            <div>
                <h2 className='ml-2 mt-1'>Hello {auth.userName}!</h2>
                <div className='fluid-container mx-auto text-center' style={{ maxWidth: '90%' }}>
                    <ProfileProjectGroup groupTitle="Beta Access" apps={betaApps} />
                    {adminShow && <ProfileProjectGroup groupTitle="Admin Access" apps={adminApps} />}
                </div>
            </div>
        </AuthPageWrapper >
    );
}
