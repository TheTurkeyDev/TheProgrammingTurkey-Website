import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { AuthPageWrapper } from '../base/auth-page-wrapper';
import * as authApi from '../../network/auth-network';
import { ItemLinkGroup } from '../../components/item-link-group';

export const UserProfile = (props) => {
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
            <h2 className='ml-2 mt-1'>Hello {auth.userName}!</h2>
            <ItemLinkGroup groupTitle='Beta Access' items={betaApps} />
            {adminShow && <ItemLinkGroup groupTitle='Admin Access' items={adminApps} />}
        </AuthPageWrapper >
    );
}
