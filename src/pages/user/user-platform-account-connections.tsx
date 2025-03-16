import { Headline3, Loading, useFetch, useQuery } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { ConnectMinecraftAccountModal } from '../../modals/admin/connect-minecraft-account-modal';
import { getDevAPIBase, getSiteURLBase } from '../../network/network-helper';
import { UserConnection } from '../../types/user-connection';
import { UserPlatformAccount } from './user-platform-account';
import { getParams } from '../../network/auth-network';
import { PlatformLogin } from '../auth/platform-login';

const AccountsWrapper = styled.div`
    max-width: 500px;
    min-width: 500px;
    margin-inline: auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
`;

type LoginURL = {
    readonly url: string
}

export const UserPlatformAccountConnections = () => {
    const [showAccountConnectModal, setShowAccountConnectModal] = useState(false);

    const [accounts, loadingAccounts] = useFetch<readonly UserConnection[]>(`${getDevAPIBase()}/user/platforms`, { requestData: getParams });
    const [links, loadingLinks] = useFetch<readonly PlatformLogin[]>(`${getDevAPIBase()}/auth/platformlinks`, { requestData: getParams });
    const [getLoginURL] = useQuery<LoginURL>(`${getDevAPIBase()}/auth/platformlinks`);

    const login = (platform: string) => {
        getLoginURL(undefined, platform, `returnurl=${getSiteURLBase()}${location.pathname}`)
            .then(resp => { if (!!resp) location.href = resp.url; });
    };

    return (
        <AccountsWrapper>
            <Headline3>Connect Accounts!</Headline3>
            {
                (loadingAccounts || loadingLinks)
                    ? <Loading />
                    : links?.map(platformLink => (
                        <UserPlatformAccount
                            key={platformLink.platform}
                            accounts={accounts ?? []}
                            platform_name={platformLink.platform}
                            icon={platformLink.icon}
                            color={platformLink.color}
                            onClick={() => login(platformLink.platform)}
                        />
                    ))
            }
            <UserPlatformAccount
                accounts={accounts ?? []}
                platform_name='Minecraft'
                icon='fas fa-cube'
                color='#058205'
                onClick={() => setShowAccountConnectModal(true)}
                disabled={true}
            />
            {showAccountConnectModal && <ConnectMinecraftAccountModal show={showAccountConnectModal} requestClose={() => setShowAccountConnectModal(false)} />}
        </AccountsWrapper>
    );
};
