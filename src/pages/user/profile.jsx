import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import * as authApi from '../../network/auth-network';
import { ItemLinkGroup } from '../../components/item-link-group';

export const UserProfile = () => {
    const { permissions, userName } = useAuth();

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

    const adminShow = permissions.some((perm) =>
        adminApps.find(aa => perm.match(aa.perm) != null)
    );

    return (
        <>
            <h2>Hello {userName}!</h2>
            <ItemLinkGroup groupTitle='Beta Access' items={betaApps} />
            {adminShow && <ItemLinkGroup groupTitle='Admin Access' items={adminApps} />}
        </ >
    );
}
