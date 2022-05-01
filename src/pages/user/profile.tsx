import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import * as authApi from '../../network/auth-network';
import { ItemLinkGroup } from '../../components/item-link-group';
import { Headline3 } from '@theturkeydev/gobble-lib-react';
import { ItemLinkType } from '../../components/item-link-type';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: grid;
    gap: 32px;
    padding: 4px 8px;
`;

export const UserProfile = () => {
    const { permissions, userName } = useAuth();

    const [betaApps, setBetaApps] = useState<readonly ItemLinkType[]>([]);
    const [adminApps, setAdminApps] = useState<readonly ItemLinkType[]>([]);

    useEffect(() => {
        authApi.getUserProfileApps(false).then(json => {
            setBetaApps(json);
        });
        authApi.getUserProfileApps(true).then(json => {
            setAdminApps(json);
        });
    }, []);

    const adminShow = permissions.some(perm =>
        adminApps.find(aa => !!perm.match(aa.permission))
    );

    return (
        <Wrapper>
            <Headline3>Hello {userName}!</Headline3>
            <ItemLinkGroup groupTitle='Beta Access' items={betaApps} />
            {adminShow && <ItemLinkGroup groupTitle='Admin Access' items={adminApps} />}
        </Wrapper>
    );
};
